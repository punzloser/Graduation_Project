import { actorMovieDTO } from "../Actor/actorCreationDTO";
import { genreDTO } from "../Genre/IGenre";
import { movieTheaterDTO } from "../MovieTheater/IMovieTheater";

export default interface movieCreationDTO {
    title: string,
    inTheaters: boolean,
    trailer: string,
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