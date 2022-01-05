import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { movieUrl } from "../../../endpoints";
import { Loading } from "../../Utilities/Loading";
import { genreDTO } from "../Genre/IGenre";
import { movieTheaterDTO } from "../MovieTheater/IMovieTheater";
import movieCreationDTO, { moviePostGetDTO } from "./IMovie";
import { MovieForm } from "./MovieForm";

export const MovieCreate = () => {
    const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState<movieTheaterDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${movieUrl}/postget`)
            .then((response: AxiosResponse<moviePostGetDTO>) => {
                setNonSelectedGenres(response.data.genres);
                setNonSelectedMovieTheaters(response.data.movieTheaters);

                setLoading(false);
            })
    }, []);

    return (
        <div className="container-fluid">
            <h3 className="text-muted">Khởi tạo</h3>
            {loading ? <Loading /> :
            
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
            }
        </div>
    );
}

const defaultMovie: movieCreationDTO = {
    title: '',
    trailer: '',
    inTheaters: false,
}