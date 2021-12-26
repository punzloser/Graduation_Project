import axios from "axios";
import { useHistory } from "react-router-dom";
import { genreUrl } from "../../../endpoints";
import { defaultGenre } from "./defaultGenre";
import { GenreForm } from "./GenreForm";
import { IGenre } from './IGenre'

export const GenreCreate = () => {

    const history = useHistory();

    const create = async (genre: IGenre) => {
        try {
            await axios.post(genreUrl, genre);
            history.push('/the-loai')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-fluid">
            <h3 className="text-muted">Khởi tạo</h3>
            <GenreForm
                initValue={defaultGenre}
                onSubmit={async e => {
                    await create(e);
                }}
            />

        </div>
    );
}