import express from 'express';
//import videosService from '../services/videos.service';
import debug from 'debug';
//import { PatchVideoDto } from '../dto/patch.video.dto';
import usersService from '../../users/services/users.service';
import videosService from '../../videos/services/videos.service';

const log: debug.IDebugger = debug('app:videos-controller');

class FavoritesController {
    async listFavorites(req: express.Request, res: express.Response) {
        const user = await usersService.readById(res.locals.jwt.userId);
        const favoriteVideos = await videosService.getByIds(user.favorites);
        res.status(200).send(favoriteVideos);
    }

    async addToFavorites(req: express.Request, res: express.Response) {
        await usersService.addVideoToFavorites(res.locals.jwt.userId, req.body.id);
        res.status(204).send();
    }

    // async deleteFromFavorites(req: express.Request, res: express.Response) {
    //     log(await videosService.deleteById(req.body.id));
    //     res.status(204).send();
    // }
}

export default new FavoritesController();
