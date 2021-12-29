import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genreUrl } from "../../../endpoints";
import { Btn } from "../../Utilities/Btn";
import { CustomConfirm } from "../../Utilities/CustomConfirm";
import { GeneralList } from "../../Utilities/GeneralList";
import { Pagination } from "../../Utilities/Pagination";
import { RecordsFilter } from "../../Utilities/RecordsFilter";
import { genreDTO } from './IGenre';

export const GenreIndex = () => {

    const [genreList, setGenreList] = useState<genreDTO[]>([]);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [totalOfPages, setTotalOfPages] = useState(0);
    const [page, setPage] = useState(1);

    const indexLoading = () => {

        axios.get(genreUrl, {
            params: { page, recordsPerPage }
        })
            .then((response: AxiosResponse<genreDTO[]>) => {
                const totalOfRecords = parseInt(response.headers['totalofrecords'], 10);
                setTotalOfPages(Math.ceil(totalOfRecords / recordsPerPage));
                setGenreList(response.data);
            })
    }

    useEffect(() => {
        indexLoading();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [page, recordsPerPage])

    const del = async (id: number) => {
        try {
            await axios.delete(`${genreUrl}?id=${id}`)
            indexLoading();

        } catch (error: any) {
            if (error || error.response) {
                console.log(error.response.data)
            }
        }
    }

    return (
        <div className="container-fluid">
            <h3 className="text-muted">Thể loại</h3>
            <Link className="btn btn-lg btn-primary" to="/the-loai/them">Khởi tạo</Link>
            <Pagination currentPage={page} totalOfPages={totalOfPages} onChange={e => setPage(e)} />
            <RecordsFilter onChange={(e) => {
                setPage(1);
                setRecordsPerPage(e);
            }} />
            <GeneralList _list={genreList}>
                <table className="table table-hover table-responsive table-striped w-75 mb-5">
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
                                        <Btn
                                            bgColor="btn btn-lg btn-danger ms-2"
                                            onClick={() => CustomConfirm(() => del(e.id))}
                                        >
                                            Xóa
                                        </Btn>
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