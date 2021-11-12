import { CommonRoutesConfig } from '../common/common.routes.config';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

import express from 'express';
import FavoritesController from './controllers/favorites.controller';
import VideosMiddleware from '../videos/middleware/videos.middleware';
import favoritesMiddleware from './middleware/favorites.middleware';

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

        this.app.param(`videoId`, VideosMiddleware.extractVideoId);
        this.app
            .route(`/favorites/:videoId`)
            .post(
                jwtMiddleware.validJWTNeeded,
                VideosMiddleware.validateVideoExists,
                favoritesMiddleware.validateVideoIsNotFavorited,
                FavoritesController.addToFavorites
            )
            // .delete(
            //   
            //     FavoritesController.removeFavorite()
            // );
        
        return this.app;
    }
}
