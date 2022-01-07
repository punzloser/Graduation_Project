import { useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import { Link } from "react-router-dom";
import { Btn } from "../Utilities/Btn";
import { CustomConfirm } from "../Utilities/CustomConfirm";
import { Pagination } from "../Utilities/Pagination";
import { RecordsFilter } from "../Utilities/RecordsFilter";
import { GeneralList } from "../Utilities/GeneralList";
import { ReactElement } from "react-markdown/lib/react-markdown";

interface IIndex<T> {
    urlBase: string,
    urlCreate: string,
    title: string,
    children: (entityList: T[], buttons: (urlUpdate: string, id: number) => ReactElement) => ReactElement
}

export default function Index<T>(props: IIndex<T>) {
    const [entityList, setEntityList] = useState<T[]>([]);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [totalOfPages, setTotalOfPages] = useState(0);
    const [page, setPage] = useState(1);

    const indexLoading = async () => {

        await axios.get(props.urlBase, {
            params: { page, recordsPerPage }
        })
            .then((response: AxiosResponse<T[]>) => {
                const totalOfRecords = parseInt(response.headers['totalofrecords'], 10);
                setTotalOfPages(Math.ceil(totalOfRecords / recordsPerPage));
                setEntityList(response.data);
            })
    }

    useEffect(() => {
        indexLoading();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [page, recordsPerPage])

    const del = async (id: number) => {
        try {
            await axios.delete(`${props.urlBase}?id=${id}`)
            indexLoading();

        } catch (error: any) {
            if (error && error.response) {
                console.log(error.response.data)
            }
        }
    }

    const buttons = (urlUpdate: string, id: number) => (
        <>
            <Link className="btn btn-lg btn-warning" to={urlUpdate}>Sửa đổi</Link>
            <Btn
                bgColor="btn btn-lg btn-danger ms-2"
                onClick={() => CustomConfirm(() => del(id))}
            >
                Xóa
            </Btn>
        </>
    );

    return (
        <div className="container-fluid">
            <h3 className="text-muted">{props.title}</h3>
            <Link className="btn btn-lg btn-primary" to={props.urlCreate}>Khởi tạo</Link>
            <Pagination currentPage={page} totalOfPages={totalOfPages} onChange={e => setPage(e)} />
            <RecordsFilter onChange={(e) => {
                setPage(1);
                setRecordsPerPage(e);
            }} />

            <GeneralList _list={entityList}>
                <table className="table table-hover table-responsive table-striped w-75 mb-5">
                    {props.children(entityList!, buttons)}
                </table>
            </GeneralList>
        </div>
    );
}