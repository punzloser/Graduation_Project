import { actorMovieDTO } from "../Actor/IActor";
import { genreDTO } from "../Genre/IGenre";
import { movieTheaterDTO } from "../MovieTheater/IMovieTheater";

export interface movieDTO {
    id: number,
    title: string,
    inTheaters: boolean,
    trailer: string,
    summary?: string,
    releaseDate?: Date,
    poster?: string,
    genres?: genreDTO[]
    movieTheaters?: movieTheaterDTO[],
    actors?: actorMovieDTO[]
}

export default interface movieCreationDTO {
    title: string,
    inTheaters: boolean,
    trailer: string,
    summary?: string,
    releaseDate?: Date,
    poster?: File,
    posterUrl?: string,
    genreIds?: number[]
    movieTheaterIds?: number[],
    actors?: actorMovieDTO[]
}

export interface moviePostGetDTO {
    genres: genreDTO[],
    movieTheaters: movieTheaterDTO[]
}

export interface moviePutGetDTO {
    movie: movieDTO,
    selectedGenres, nonSelectedGenres: genreDTO[],
    selectedMovieTheaters, nonSelectedMovieTheaters: movieTheaterDTO[],
    actors: actorMovieDTO[]
}