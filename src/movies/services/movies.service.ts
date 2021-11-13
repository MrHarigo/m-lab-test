import MoviesDao from '../daos/Movies.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateMovieDto } from '../dto/create.Movie.dto';
import { PutMovieDto } from '../dto/put.Movie.dto';
import { PatchMovieDto } from '../dto/patch.Movie.dto';

class MoviesService implements CRUD {
    async create(resource: CreateMovieDto) {
        return MoviesDao.addMovie(resource);
    }

    async deleteById(id: string) {
        return MoviesDao.removeMovieById(id);
    }

    async list(limit: number, page: number) {
        return MoviesDao.getMovies(limit, page);
    }

    async patchById(id: string, resource: PatchMovieDto): Promise<any> {
        return MoviesDao.updateMovieById(id, resource);
    }

    async putById(id: string, resource: PutMovieDto): Promise<any> {
        return MoviesDao.updateMovieById(id, resource);
    }

    async readById(id: string) {
        return MoviesDao.getMovieById(id);
    }

    async getByIds(ids: [string]) {
        return MoviesDao.getMoviesByIds(ids);
    }

    async search(searchQuery: string, limit: number, page: number) {
        return MoviesDao.getMoviesBySearchQuery(searchQuery, limit, page);
    }
}

export default new MoviesService();
