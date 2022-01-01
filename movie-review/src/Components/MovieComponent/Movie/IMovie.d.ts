import { actorMovieDTO } from "../Actor/actorCreationDTO";

export default interface IMovie {
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