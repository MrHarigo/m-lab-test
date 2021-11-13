import express from 'express';
import MoviesService from '../services/Movies.service';

class MoviesMiddleware {

    async validateMovieExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const movie = await MoviesService.readById(req.params.movieId);
        if (movie) {
            res.locals.movie = movie;
            next();
        } else {
            res.status(404).send({
                errors: [`Movie ${req.params.movieId} not found`],
            });
        }
    }

    async extractMovieId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.movieId;
        next();
    }

    async extractMovieSearchQuery(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.searchQuery = req.query.search;
        next();
    }
}

export default new MoviesMiddleware();
