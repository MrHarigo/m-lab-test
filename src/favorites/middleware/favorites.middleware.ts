import express from 'express';
import usersService from '../../users/services/users.service';

class FavoritesMiddleware {

    async validateVideoIsNotFavorited(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await usersService.readById(res.locals.jwt.userId);

        if (!user.favorites.includes(req.params.videoId)) {
            next();
        } else {
            res.status(400).send({
                errors: [`Video ${req.params.videoId} is already favorited`],
            });
        }
    }
}

export default new FavoritesMiddleware();
