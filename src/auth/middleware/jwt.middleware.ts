import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import {Jwt} from '../../common/types/jwt';
import usersService from '../../users/services/users.service';

// @ts-expect-error depr
const jwtSecret: string = process.env.JWT_SECRET;

class JwtMiddleware {
  verifyRefreshBodyField(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      return res
        .status(400)
        .send({errors: ['Missing required field: refreshToken']});
    }
  }

  async validRefreshNeeded(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await usersService.getUserByEmailWithPassword(
      res.locals.jwt.email
    );
    const salt = crypto.createSecretKey(
      Buffer.from(res.locals.jwt.refreshKey.data)
    );
    const hash = crypto
      .createHmac('sha512', salt)
      .update(res.locals.jwt.userId + jwtSecret)
      .digest('base64');
    if (hash === req.body.refreshToken) {
      req.body = {
        userId: user._id,
        email: user.email,
        permissionFlags: user.permissionFlags,
      };
      return next();
    } else {
      return res.status(400).send({errors: ['Invalid refresh token']});
    }
  }

  validJWTNeeded(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          res.status(401).send();
        } else {
          res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
          next();
        }
      } catch (err) {
        res.status(403).send();
      }
    } else {
      res.status(401).send();
    }
  }
}

export default new JwtMiddleware();
