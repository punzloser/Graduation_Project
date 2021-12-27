import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genreUrl } from "../../../endpoints";
import { Btn } from "../../Utilities/Btn";
import { GeneralList } from "../../Utilities/GeneralList";
import { genreDTO } from './IGenre';

export const GenreIndex = () => {

    const [genreList, setGenreList] = useState<genreDTO[]>([]);

    useEffect(() => {
        axios.get(genreUrl)
            .then((response: AxiosResponse<genreDTO[]>) => {
                setGenreList(response.data);
            })
    }, [])

    return (
        <div className="container-fluid">
            <h3 className="text-muted">Thể loại</h3>
            <Link className="btn btn-lg btn-primary" to="/the-loai/them">Khởi tạo</Link>
            <GeneralList _list={genreList}>
                <table className="table table-hover table-responsive table-striped w-75">
                    <thead>
                        <tr>
                            <th>Thể loại</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            genreList?.map((e, i) =>
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td>
                                        <Link className="btn btn-lg btn-warning" to={`the-loai/sua/${e.id}`}>Sửa đổi</Link>
                                        <Btn bgColor="btn btn-lg btn-danger ms-2">Xóa</Btn>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </GeneralList>
        </div>
    );
}