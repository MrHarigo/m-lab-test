import * as express from 'express';
import debug from 'debug';
import usersService from '../../users/services/users.service';
import moviesService from '../../movies/services/movies.service';

const log: debug.IDebugger = debug('app:movies-controller');

class FavoritesController {
  async listFavorites(req: express.Request, res: express.Response) {
    const user = await usersService.readById(res.locals.jwt.userId);
    const favoriteMovies = await moviesService.getByIds(user.favorites);
    log(`found favorite movies: ${favoriteMovies} for user: ${user}`);
    res.status(200).send(favoriteMovies);
  }

  async addToFavorites(req: express.Request, res: express.Response) {
    await usersService.addMovieToFavorites(res.locals.jwt.userId, req.body.id);
    res.status(204).send();
  }

  async deleteFromFavorites(req: express.Request, res: express.Response) {
    await usersService.deleteMovieFromFavorites(
      res.locals.jwt.userId,
      req.body.id
    );
    res.status(204).send();
  }
}

export default new FavoritesController();
