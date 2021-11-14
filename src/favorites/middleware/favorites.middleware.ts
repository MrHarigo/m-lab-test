import * as express from 'express';
import usersService from '../../users/services/users.service';

class FavoritesMiddleware {
  async validateMovieIsNotFavorited(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await usersService.readById(res.locals.jwt.userId);

    if (!user.favorites.includes(req.params.movieId)) {
      next();
    } else {
      res.status(400).send({
        errors: [`Movie ${req.params.movieId} is already favorited`],
      });
    }
  }

  async validateMovieIsFavorited(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await usersService.readById(res.locals.jwt.userId);

    if (user.favorites.includes(req.params.movieId)) {
      next();
    } else {
      res.status(400).send({
        errors: [`Movie ${req.params.movieId} is not favorited`],
      });
    }
  }
}

export default new FavoritesMiddleware();
