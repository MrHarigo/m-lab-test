import mongooseService from '../../common/services/mongoose.service';
import * as shortid from 'shortid';
import debug from 'debug';
import {CreateMovieDto} from '../dto/create.movie.dto';
import {PatchMovieDto} from '../dto/patch.movie.dto';
import {PutMovieDto} from '../dto/put.movie.dto';
import {PermissionFlag} from '../../common/middleware/common.permissionflag.enum';

const log: debug.IDebugger = debug('app:movies-dao');

class MoviesDao {
  Schema = mongooseService.getMongoose().Schema;

  movieSchema = new this.Schema(
    {
      _id: String,
      name: String,
      description: String,
    },
    {id: false}
  ).index({name: 'text', '$**': 'text'});

  Movie = mongooseService.getMongoose().model('Movies', this.movieSchema);

  constructor() {
    log('Created new instance of MoviesDao');
  }

  async addMovie(movieFields: CreateMovieDto) {
    const movieId = shortid.generate();
    const movie = new this.Movie({
      _id: movieId,
      ...movieFields,
      permissionFlags: PermissionFlag.FREE_PERMISSION,
    });
    await movie.save();
    return movieId;
  }

  async removeMovieById(movieId: string) {
    return await this.Movie.deleteOne({_id: movieId}).exec();
  }

  async getMovieById(movieId: string) {
    return await this.Movie.findOne({_id: movieId}).populate('Movie').exec();
  }

  async getMovies(limit = 25, page = 0) {
    return await this.Movie.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateMovieById(
    movieId: string,
    movieFields: PatchMovieDto | PutMovieDto
  ) {
    const existingMovie = await this.Movie.findOneAndUpdate(
      {_id: movieId},
      {$set: movieFields},
      {new: true}
    ).exec();

    return existingMovie;
  }

  async getMoviesByIds(ids: [string]) {
    const movies = await this.Movie.find({_id: {$in: ids}}).exec();
    return movies;
  }

  async getMoviesBySearchQuery(searchQuery: string, limit = 25, page = 0) {
    return await this.Movie.find({$text: {$search: searchQuery}})
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getMoviesByNameAndDescription(name: string, description: string) {
    return await this.Movie.find({
      name: name,
      description: description,
    }).exec();
  }
}

export default new MoviesDao();
