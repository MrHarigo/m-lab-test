import express from 'express';
import moviesService from '../services/movies.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:movies-controller');

class MoviesController {
    async listMovies(req: express.Request, res: express.Response) {
        let movies = [];
        if (req.body.searchQuery) {
            movies = await moviesService.search(req.body.searchQuery, 100, 0);
        } else {
            movies = await moviesService.list(100, 0);
        }
        res.status(200).send(movies);
    }

    async getMovieById(req: express.Request, res: express.Response) {
        const movie = await moviesService.readById(req.body.id);
        res.status(200).send(movie);
    }

    async createMovie(req: express.Request, res: express.Response) {
        const movieId = await moviesService.create(req.body);
        res.status(201).send({ id: movieId });
    }

    async patch(req: express.Request, res: express.Response) {
        log(await moviesService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        log(await moviesService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeMovie(req: express.Request, res: express.Response) {
        log(await moviesService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new MoviesController();
