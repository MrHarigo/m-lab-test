import express from 'express';
import videosService from '../services/videos.service';
import debug from 'debug';
import { PatchVideoDto } from '../dto/patch.video.dto';

const log: debug.IDebugger = debug('app:videos-controller');

class VideosController {
    async listVideos(req: express.Request, res: express.Response) {
        const videos = await videosService.list(100, 0);
        res.status(200).send(videos);
    }

    async getVideoById(req: express.Request, res: express.Response) {
        const video = await videosService.readById(req.body.id);
        res.status(200).send(video);
    }

    async createVideo(req: express.Request, res: express.Response) {
        const videoId = await videosService.create(req.body);
        res.status(201).send({ id: videoId });
    }

    async patch(req: express.Request, res: express.Response) {
        log(await videosService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        log(await videosService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeVideo(req: express.Request, res: express.Response) {
        log(await videosService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new VideosController();
