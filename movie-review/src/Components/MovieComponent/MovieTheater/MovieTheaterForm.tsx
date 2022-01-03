import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { Btn } from "../../Utilities/Btn";
import { TextField } from "../TextField";
import { movieTheaterCreationDTO } from "./IMovieTheater";
import * as Yup from 'yup';
import { MapField } from "../MapField";
import ICoordinate from "../../Utilities/ICoordinate";

interface IMovieTheaterForm {
    model: movieTheaterCreationDTO,
    onSubmit(values: movieTheaterCreationDTO, action: FormikHelpers<movieTheaterCreationDTO>): void
}
export const MovieTheaterForm = (props: IMovieTheaterForm) => {
    const changeCoordinate = (): ICoordinate[] | undefined => {
        if (props.model.longitude && props.model.latitude) {
            const response: ICoordinate =
                { lat: props.model.latitude, lng: props.model.longitude };
            return [response];
        }
        return undefined;
    }
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required('Nhập tên rạp').firstLetterUppercase()
            })}
        >
            {formProps => (
                <Form>
                    <TextField field="name" displayName="Tên rạp" />
                    <MapField
                        latField="latitude"
                        lngField="longitude"
                        coordinates={changeCoordinate()}
                    />
                    <div className="mb-5">
                        <Btn type="submit" disabled={formProps.isSubmitting}>Lưu lại</Btn>
                        <Link className="btn btn-md btn-warning ms-2" to="/phim">Hủy</Link>
                    </div>
                </Form>
            )}

        </Formik>
    );
}