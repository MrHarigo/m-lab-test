import mongooseService from '../../common/services/mongoose.service';
import shortid from 'shortid';
import debug from 'debug';
import { CreateVideoDto } from '../dto/create.video.dto';
import { PatchVideoDto } from '../dto/patch.video.dto';
import { PutVideoDto } from '../dto/put.video.dto';
import { PermissionFlag } from '../../common/middleware/common.permissionflag.enum';

const log: debug.IDebugger = debug('app:videos-dao');

class VideosDao {
    Schema = mongooseService.getMongoose().Schema;

    videoSchema = new this.Schema({
        _id: String,
        name: String,
        description: String,
    }, { id: false });

    Video = mongooseService.getMongoose().model('Videos', this.videoSchema);

    constructor() {
        log('Created new instance of VideosDao');
    }

    async addVideo(videoFields: CreateVideoDto) {
        const videoId = shortid.generate();
        const video = new this.Video({
            _id: videoId,
            ...videoFields,
            permissionFlags: PermissionFlag.FREE_PERMISSION,
        });
        await video.save();
        return videoId;
    }

    async removeVideoById(videoId: string) {
        return this.Video.deleteOne({ _id: videoId }).exec();
    }

    async getVideoById(videoId: string) {
        return this.Video.findOne({ _id: videoId }).populate('Video').exec();
    }

    async getVideos(limit = 25, page = 0) {
        return this.Video.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async updateVideoById(
        videoId: string,
        videoFields: PatchVideoDto | PutVideoDto
    ) {
        const existingVideo = await this.Video.findOneAndUpdate(
            { _id: videoId },
            { $set: videoFields },
            { new: true }
        ).exec();

        return existingVideo;
    }

    async getVideosByIds(ids: [string]) {
        const videos = await this.Video.find(
            { _id: { $in: ids } }
        ).exec();
        return videos;
    }
}

export default new VideosDao();
