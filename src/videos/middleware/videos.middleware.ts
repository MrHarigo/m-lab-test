import express from 'express';
import videosService from '../services/videos.service';
import userService from '../services/videos.service';

class VideosMiddleware {

    async validateVideoExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const video = await videosService.readById(req.params.videoId);
        if (video) {
            res.locals.video = video;
            next();
        } else {
            res.status(404).send({
                errors: [`Video ${req.params.videoId} not found`],
            });
        }
    }

    async extractVideoId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.videoId;
        next();
    }
}

export default new VideosMiddleware();
