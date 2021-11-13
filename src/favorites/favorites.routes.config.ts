import { CommonRoutesConfig } from '../common/common.routes.config';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

import express from 'express';
import FavoritesController from './controllers/favorites.controller';
import MoviesMiddleware from '../movies/middleware/movies.middleware';
import FavoritesMiddleware from './middleware/favorites.middleware';

export class FavoritesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'MoviesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/favorites`)
            .get(
                jwtMiddleware.validJWTNeeded,
                FavoritesController.listFavorites
            )

        this.app.param(`movieId`, MoviesMiddleware.extractMovieId);
        this.app
            .route(`/favorites/:movieId`)
            .all(
                jwtMiddleware.validJWTNeeded,
                MoviesMiddleware.validateMovieExists
            )
            .post(
                FavoritesMiddleware.validateMovieIsNotFavorited,
                FavoritesController.addToFavorites
            )
            .delete(   
                FavoritesMiddleware.validateMovieIsFavorited,
                FavoritesController.deleteFromFavorites
            );
        
        return this.app;
    }
}
