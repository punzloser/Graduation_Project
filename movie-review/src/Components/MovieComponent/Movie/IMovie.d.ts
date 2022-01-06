import { actorMovieDTO } from "../Actor/IActor";
import { genreDTO } from "../Genre/IGenre";
import { movieTheaterDTO } from "../MovieTheater/IMovieTheater";

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