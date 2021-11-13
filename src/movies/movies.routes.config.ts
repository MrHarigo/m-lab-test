import { CommonRoutesConfig } from '../common/common.routes.config';
import MoviesController from './controllers/movies.controller';
import MoviesMiddleware from './middleware/movies.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import PermissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';

import express from 'express';

export class MoviesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'MoviesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/movies`)
            .get(
                MoviesMiddleware.extractMovieSearchQuery,
                MoviesController.listMovies
            )
            .post(
                body('name')
                    .isString()
                    .isLength({ min: 1 })
                    .withMessage('Must include a name (non-empty string)'),
                body('description').isString(),
                jwtMiddleware.validJWTNeeded,
                PermissionMiddleware.permissionFlagRequired(
                    PermissionFlag.EDITOR_PERMISSION
                ),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                // Not checking for existing duplicates, due to the fact that films might have same names
                MoviesController.createMovie
            );

        this.app.param(`movieId`, MoviesMiddleware.extractMovieId);
        this.app
            .route(`/movies/:movieId`)
            .all(
                MoviesMiddleware.validateMovieExists,
            )
            .get(MoviesController.getMovieById)
            .delete(
                jwtMiddleware.validJWTNeeded,
                PermissionMiddleware.permissionFlagRequired(
                    PermissionFlag.EDITOR_PERMISSION
                ),
                MoviesController.removeMovie
            );

        this.app.put(`/movies/:movieId`, [
            body('name')
                .isString()
                .isLength({ min: 1 })
                .withMessage('Must include a name (non-empty string)'),
            body('description').isString(),
            jwtMiddleware.validJWTNeeded,
            PermissionMiddleware.permissionFlagRequired(
                PermissionFlag.EDITOR_PERMISSION
            ),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            MoviesController.put,
        ]);

        this.app.patch(`/movies/:movieId`, [
            body('name')
                .isString()
                .isLength({ min: 1 })
                .withMessage('Must include a name (non-empty string)'),
            body('description').isString(),
            jwtMiddleware.validJWTNeeded,
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            PermissionMiddleware.permissionFlagRequired(
                PermissionFlag.EDITOR_PERMISSION
            ),
            MoviesController.patch,
        ]);
        
        return this.app;
    }
}
