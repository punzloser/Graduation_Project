import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { movieTheaterUrl } from "../../../endpoints";
import { DisplayErrors } from "../../Utilities/DisplayErrors";
import { movieTheaterCreationDTO } from "./IMovieTheater";
import { MovieTheaterForm } from "./MovieTheaterForm";

export const MovieTheaterCreate = () => {

    const history = useHistory();
    const [errs, setErrs] = useState<string[]>([])

    const create = (movieTheater: movieTheaterCreationDTO) => {
        try {
            axios.post(movieTheaterUrl, movieTheater);
            history.push('/rap');
        } catch (error: any) {
            if (error && error.response) {
                setErrs(error.response.data);
            }
        }
    }

    return (
        <div className="container-fluid">
            <h3 className="text-muted">Khởi tạo</h3>
            <DisplayErrors errors={errs} />
            <MovieTheaterForm
                model={defaultMovieTheater}
                onSubmit={async e => {
                    await create(e);
                }}
            />
        </div>
    );
}

const defaultMovieTheater: movieTheaterCreationDTO = {
    name: ''
}