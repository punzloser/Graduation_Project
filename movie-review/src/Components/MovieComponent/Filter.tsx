import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { genreUrl, movieUrl } from "../../endpoints";
import { Btn } from "../Utilities/Btn";
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
        inTheaters: false
    }

    const [genres, setGenres] = useState<genreDTO[]>([]);
    const [posters, setPosters] = useState<IPoster[]>([]);

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
                setPosters(response.data);
            });
    }

    useEffect(() => {
        loadGenres();
    }, [])

    useEffect(() => {
        filter(defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    return (
        <div className="container-fluid">
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
                    </>
                )}

            </Formik>
        </div>
    );
}