import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { genreUrl } from "../../../endpoints";
import { DisplayErrors } from "../../Utilities/DisplayErrors";
import { defaultGenre } from "./defaultGenre";
import { GenreForm } from "./GenreForm";
import { genreCreationDTO } from './IGenre'

export const GenreCreate = () => {

    const [errs, setErrs] = useState<string[]>([]);
    const history = useHistory();

    const create = async (genre: genreCreationDTO) => {
        try {
            await axios.post(genreUrl, genre);
            history.push('/the-loai')
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
            <GenreForm
                initValue={defaultGenre}
                onSubmit={async e => {
                    await create(e);
                }}
            />

        </div>
    );
}