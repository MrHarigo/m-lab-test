import VideosDao from '../daos/videos.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateVideoDto } from '../dto/create.video.dto';
import { PutVideoDto } from '../dto/put.video.dto';
import { PatchVideoDto } from '../dto/patch.video.dto';

class VideosService implements CRUD {
    async create(resource: CreateVideoDto) {
        return VideosDao.addVideo(resource);
    }

    async deleteById(id: string) {
        return VideosDao.removeVideoById(id);
    }

    async list(limit: number, page: number) {
        return VideosDao.getVideos(limit, page);
    }

    async patchById(id: string, resource: PatchVideoDto): Promise<any> {
        return VideosDao.updateVideoById(id, resource);
    }

    async putById(id: string, resource: PutVideoDto): Promise<any> {
        return VideosDao.updateVideoById(id, resource);
    }

    async readById(id: string) {
        return VideosDao.getVideoById(id);
    }

    async getByIds(ids: [string]) {
        return VideosDao.getVideosByIds(ids);
    }

    async search(searchQuery: string, limit: number, page: number) {
        return VideosDao.getVideosBySearchQuery(searchQuery, limit, page);
    }
}

export default new VideosService();
