import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { genreUrl } from "../../../endpoints";
import { DisplayErrors } from "../../Utilities/DisplayErrors";
import { Loading } from "../../Utilities/Loading";
import { GenreForm } from "./GenreForm";
import { IGenre } from "./IGenre";

export const GenreUpdate = () => {
    const history = useHistory();
    const { id }: any = useParams();
    const [genre, setGenre] = useState<IGenre>();
    const [errs, setErrs] = useState<string[]>([]);

    const update = async (genre: IGenre) => {
        try {
            await axios.put(`${genreUrl}/${id}`, genre);
            history.push('/the-loai');
        } catch (err: any) {
            if (err || err.response) {
                setErrs(err.response.data);
            }
        }
    }

    useEffect(() => {
        axios.get(`${genreUrl}/${id}`)
            .then((response: AxiosResponse<IGenre>) => {
                setGenre(response.data);
            })
    }, [id]);
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Sửa đổi</h3>
            <DisplayErrors errors={errs} />
            {
                !genre ? <Loading /> :

                    <GenreForm
                        initValue={genre}
                        onSubmit={async e => {
                            await update(e);
                        }}
                    />
            }
        </div>
    );
}