import { PutMovieDto } from './put.movie.dto';

export interface PatchMovieDto extends Partial<PutMovieDto> {}
