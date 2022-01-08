import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { movieUrl } from "../../../endpoints";
import { DisplayErrors } from "../../Utilities/DisplayErrors";
import { MovieToFormData } from "../../Utilities/FormData";
import { Loading } from "../../Utilities/Loading";
import movieCreationDTO, { moviePutGetDTO } from "./IMovie";
import { MovieForm } from "./MovieForm";

export const MovieUpdate = () => {
    const [movie, setMovie] = useState<movieCreationDTO>();
    const [data, setData] = useState<moviePutGetDTO>();
    const [errs, setErrs] = useState<string[]>();
    const { id }: any = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.get(`${movieUrl}/putget/${id}`)
            .then((response: AxiosResponse<moviePutGetDTO>) => {
                const model: movieCreationDTO = {
                    title: response.data.movie.title,
                    inTheaters: response.data.movie.inTheaters,
                    trailer: response.data.movie.trailer,
                    releaseDate: new Date(`${response.data.movie.releaseDate}`),
                    summary: response.data.movie.summary,
                    posterUrl: response.data.movie.poster
                }
                setMovie(model);
                setData(response.data);
            });
    }, [id])

    const update = async (model: movieCreationDTO) => {
        const formData = MovieToFormData(model);

        try {
            await axios({
                method: "put",
                url: `${movieUrl}/${id}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            history.push(`/phim/${id}`)

        } catch (error: any) {
            if (error && error.response) {
                setErrs(error);
            }
        }
    }

    return (
        <div className="container-fluid">
            <h3 className="text-muted">Sửa đổi</h3>
            <DisplayErrors errors={errs} />
            {
                movie && data ?
                    <MovieForm
                        model={movie}
                        onSubmit={async e => {
                            await update(e);
                        }}
                        selectedGenres={data.selectedGenres}
                        nonSelectedGenres={data.nonSelectedGenres}
                        selectedMovieTheaters={data.selectedMovieTheaters}
                        nonSelectedMovieTheaters={data.nonSelectedMovieTheaters}
                        selectedActors={data.actors}
                    /> : <Loading />
            }
        </div>
    );
}
