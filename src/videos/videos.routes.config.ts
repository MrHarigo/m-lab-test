import { CommonRoutesConfig } from '../common/common.routes.config';
import VideosController from './controllers/videos.controller';
import VideosMiddleware from './middleware/videos.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import PermissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';

import express from 'express';

export class VideosRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'MoviesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/videos`)
            .get(
                VideosMiddleware.extractVideoSearchQuery,
                VideosController.listVideos
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
                VideosController.createVideo
            );

        this.app.param(`videoId`, VideosMiddleware.extractVideoId);
        this.app
            .route(`/videos/:videoId`)
            .all(
                VideosMiddleware.validateVideoExists,
            )
            .get(VideosController.getVideoById)
            .delete(
                jwtMiddleware.validJWTNeeded,
                PermissionMiddleware.permissionFlagRequired(
                    PermissionFlag.EDITOR_PERMISSION
                ),
                VideosController.removeVideo
            );

        this.app.put(`/videos/:videoId`, [
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
            VideosController.put,
        ]);

        this.app.patch(`/videos/:videoId`, [
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
            VideosController.patch,
        ]);
        
        return this.app;
    }
}
