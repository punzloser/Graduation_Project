import { actorDTO } from "../Actor/IActor";
import { genreDTO } from "../Genre/IGenre";
import { movieTheaterDTO } from "../MovieTheater/IMovieTheater";
import IMovie from "./IMovie";
import { MovieForm } from "./MovieForm";

export const MovieUpdate = () => {
    const nonSelectedGenres: genreDTO[] = [{ id: 2, name: 'Comedy' }];
    const selectedGenres: genreDTO[] = [{ id: 1, name: 'Drama' }];
    const nonSelectedMovieTheaters: movieTheaterDTO[] = [{ id: 2, name: 'CGV Bình Dương' }];
    const selectedMovieTheaters: movieTheaterDTO[] = [{ id: 1, name: 'CGV Biên Hòa' }];
    const selectedActors: actorDTO[] = [{ id: 2, name: 'Triệu Vy', character: 'Yêu quái', picture: 'https://i1.sndcdn.com/artworks-000248908839-wlug27-t500x500.jpg' }]
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Sửa đổi</h3>
            <MovieForm
                model={defaultMovie}
                onSubmit={async e => {
                    await new Promise(res => setTimeout(res, 1000));
                    console.log(e);
                }}
                selectedGenres={selectedGenres}
                nonSelectedGenres={nonSelectedGenres}
                selectedMovieTheaters={selectedMovieTheaters}
                nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                selectedActors={selectedActors}
            />
        </div>
    );
}

const defaultMovie: IMovie = {
    title: 'Test',
    trailer: 'Test',
    inTheaters: true,
    posterUrl: 'https://img-cdn.2game.vn/pictures/xemgame/2016/12/13/live-action-5cm-s-3.jpg'
}