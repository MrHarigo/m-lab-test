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

    async validateNameAndDescriptionAvailability(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        let name;
        let description;
        
        if (req.body.id) {
            const movie = await MoviesService.readById(req.body.id);
            name = movie.name;
            description = movie.description;
        }
        if (req.body.name) name = req.body.name;
        if (req.body.description) description = req.body.description;

        const movies = await MoviesService.findIdentical(name, description);

        if (Array.isArray(movies) && movies.length) {
            res.status(400).send({
                errors: [`Movie with name: \"${req.body.name}\" and description: \"${req.body.description}\" already exists`]
            });
        } else {
            next();
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
