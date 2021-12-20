import { Form, Formik } from "formik";
import { Btn } from "../Utilities/Btn";
import { CheckBoxField } from "./CheckBoxField";
import { genreDTO } from "./Genre/IGenre";

interface IFilter {
    title: string,
    genreId: number,
    upcomingReleases: boolean,
    inTheaters: boolean
}

export const Filter = (props: IFilter) => {
    const defaultValue: IFilter = {
        title: '',
        genreId: 0,
        upcomingReleases: false,
        inTheaters: false
    }
    const sampleObj: genreDTO[] = [{ id: 1, name: "Kinh dị" }, { id: 2, name: "Trinh thám" }];

    return (
        <div className="container-fluid">
            <h3 className="text-muted">Bộ lọc</h3>
            <Formik
                initialValues={defaultValue}
                onSubmit={e => console.log(e)}
            >
                {formProps => (
                    <Form>
                        <div className="row gx-3 align-items-center">
                            <div className="col-auto">
                                <input {...formProps.getFieldProps('title')}
                                    className="form-control" type="text" id="title" placeholder="Tựa phim ..." />
                            </div>
                            <div className="col-auto">
                                <select {...formProps.getFieldProps('genreId')} className="form-select">
                                    <option value="0">Chọn thể loại</option>
                                    {sampleObj.map(e =>
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
                                <Btn onClick={() => formProps.setValues(defaultValue)} bgColor="btn btn-lg btn-secondary ms-2">Hủy</Btn>
                            </div>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    );
}