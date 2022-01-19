import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { genreUrl, movieUrl } from "../../endpoints";
import { Btn } from "../Utilities/Btn";
import { Pagination } from "../Utilities/Pagination";
import { CheckBoxField } from "./CheckBoxField";
import { genreDTO } from "./Genre/IGenre";
import { IPoster } from "./IPoster";
import { ListPoster } from "./ListPoster";

interface filterMovieDTO {
    title: string,
    genreId: number,
    upcomingReleases: boolean,
    inTheaters: boolean,
    page?: number,
    recordsPerPage?: number
}

export const Filter = () => {
    const defaultValue: filterMovieDTO = {
        title: '',
        genreId: 0,
        upcomingReleases: false,
        inTheaters: false,
        page: 1,
        recordsPerPage: 5
    }

    const history = useHistory();
    const searchParams = new URLSearchParams(useLocation().search);
    const [genres, setGenres] = useState<genreDTO[]>([]);
    const [posters, setPosters] = useState<IPoster[]>([]);
    const [totalOfPages, setTotalOfPage] = useState(0);

    const loadGenres = async () => {
        await axios.get(`${genreUrl}/all`)
            .then((response: AxiosResponse<genreDTO[]>) => {
                setGenres(response.data);
            });
    }

    const filter = async (values: filterMovieDTO) => {

        await axios.get(`${movieUrl}/filter`, {
            params: values
        })
            .then((response: AxiosResponse<IPoster[]>) => {
                const totalOfRecords = parseInt(response.headers['totalofrecords'], 10);
                setTotalOfPage(Math.ceil(totalOfRecords / values.recordsPerPage!));

                setPosters(response.data);
            });

        await handleUrl(values);
    }

    const handleUrl = async (values: filterMovieDTO) => {

        const thisQuery: string[] = [];
        if (values.genreId !== null && values.genreId !== 0) {
            thisQuery.push(`the-loai=${values.genreId}`)
        }
        if (values.inTheaters) {
            thisQuery.push(`dang-chieu=${values.inTheaters}`)
        }
        if (values.upcomingReleases) {
            thisQuery.push(`sap-chieu=${values.upcomingReleases}`);
        }
        if (values.title) {
            thisQuery.push(`title=${values.title}`);
        }
        if (values.page) {
            thisQuery.push(`trang=${values.page}`);
        }
        history.push(`/filter?${thisQuery.join('&')}`)
    }

    useEffect(() => {

        loadGenres();
    }, [])

    useEffect(() => {

        if (searchParams.get('title')) {
            defaultValue.title = searchParams.get('title')!;
        }
        if (searchParams.get('the-loai')) {
            defaultValue.genreId = parseInt(searchParams.get('the-loai')!, 10);
        }
        if (searchParams.get('sap-chieu')) {
            defaultValue.upcomingReleases = true;
        }
        if (searchParams.get('dang-chieu')) {
            defaultValue.inTheaters = true;
        }
        if (searchParams.get('trang')) {
            defaultValue.page = parseInt(searchParams.get('trang')!, 10);
        }

        filter(defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    return (
        <div className="container-fluid mb-5">
            <h3 className="text-muted">Bộ lọc</h3>
            <Formik
                initialValues={defaultValue}
                onSubmit={values => {
                    filter(values);
                }}
            >
                {formProps => (
                    <>
                        <Form>
                            <div className="row gx-3 align-items-center mb-3">
                                <div className="col-auto">
                                    <input {...formProps.getFieldProps('title')}
                                        className="form-control" type="text" id="title" placeholder="Tựa phim ..." />
                                </div>
                                <div className="col-auto">
                                    <select {...formProps.getFieldProps('genreId')} className="form-select">
                                        <option value="0">Chọn thể loại</option>
                                        {genres.map(e =>
                                            <option value={e.id} key={e.id}>{e.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <CheckBoxField field="upcomingReleases" displayName="Phim sắp chiếu" />
                                </div>
                                <div className="col-auto">
                                    <CheckBoxField field="inTheaters" displayName="Phim đang chiếu" />
                                </div>
                                <div className="col-auto">
                                    <Btn onClick={() => formProps.submitForm()} bgColor="btn btn-lg btn-primary">Lọc</Btn>
                                    <Btn
                                        bgColor="btn btn-lg btn-secondary ms-2"
                                        onClick={() => {
                                            formProps.setValues(defaultValue);
                                            filter(defaultValue);
                                        }}
                                    >
                                        Hủy
                                    </Btn>
                                </div>
                            </div>
                        </Form>

                        <ListPoster list={posters} />
                        <Pagination
                            currentPage={formProps.values.page!}
                            totalOfPages={totalOfPages}
                            onChange={newPage => {
                                formProps.values.page = newPage;
                                filter(formProps.values);
                            }}
                        />
                    </>
                )}

            </Formik>
        </div>
    );
}