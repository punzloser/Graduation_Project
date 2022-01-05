import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { movieUrl } from "../../../endpoints";
import { DisplayErrors } from "../../Utilities/DisplayErrors";
import { MovieToFormData } from "../../Utilities/FormData";
import { Loading } from "../../Utilities/Loading";
import { genreDTO } from "../Genre/IGenre";
import { movieTheaterDTO } from "../MovieTheater/IMovieTheater";
import movieCreationDTO, { moviePostGetDTO } from "./IMovie";
import { MovieForm } from "./MovieForm";

export const MovieCreate = () => {
    const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState<movieTheaterDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [errs, setErrs] = useState<string[]>([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${movieUrl}/postget`)
            .then((response: AxiosResponse<moviePostGetDTO>) => {
                setNonSelectedGenres(response.data.genres);
                setNonSelectedMovieTheaters(response.data.movieTheaters);

                setLoading(false);
            })
    }, []);

    const create = async (model: movieCreationDTO) => {
        try {
            const formData = MovieToFormData(model);
            const response = await axios({
                method: 'post',
                url: movieUrl,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            history.push(`/phim/${response.data}`);

        } catch (error: any) {
            if (error && error.response) {
                setErrs(error);
            }
        }
    }

    return (
        <div className="container-fluid">
            <h3 className="text-muted">Khởi tạo</h3>
            <DisplayErrors errors={errs} />
            {loading ? <Loading /> :

                <MovieForm
                    model={defaultMovie}
                    onSubmit={async e => {
                        await create(e);
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