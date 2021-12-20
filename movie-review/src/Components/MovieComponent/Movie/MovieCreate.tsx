import { genreDTO } from "../Genre/IGenre";
import { movieTheaterDTO } from "../MovieTheater/IMovieTheater";
import IMovie from "./IMovie";
import { MovieForm } from "./MovieForm";

export const MovieCreate = () => {
    const nonSelectedGenres: genreDTO[] = [{ id: 1, name: 'Drama' }, { id: 2, name: 'Comedy' }];
    const nonSelectedMovieTheaters: movieTheaterDTO[] = [{ id: 1, name: 'CGV Biên Hòa' }, { id: 2, name: 'CGV Bình Dương' }];
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Khởi tạo</h3>
            <MovieForm
                model={defaultMovie}
                onSubmit={async e => {
                    await new Promise(res => setTimeout(res, 1000));
                    console.log(e);
                }}
                selectedGenres={[]}
                nonSelectedGenres={nonSelectedGenres}
                selectedMovieTheaters={[]}
                nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                selectedActors={[]}
            />
        </div>
    );
}

const defaultMovie: IMovie = {
    title: '',
    trailer: '',
    inTheaters: false,
}