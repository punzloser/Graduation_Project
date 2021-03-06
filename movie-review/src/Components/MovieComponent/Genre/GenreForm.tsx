import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { Btn } from "../../Utilities/Btn";
import * as Yup from "yup"
import { TextField } from "../TextField";
import { genreCreationDTO } from "./IGenre";

interface genreCreationDTOForm {
    initValue: genreCreationDTO,
    onSubmit(values: genreCreationDTO, action: FormikHelpers<genreCreationDTO>): void
}

export const GenreForm = (props: genreCreationDTOForm) => {
    return (
        <Formik initialValues={props.initValue}
            onSubmit={props.onSubmit}

            validationSchema={Yup.object({
                name: Yup.string()
                    .required('Nhập thể loại')
                    .firstLetterUppercase()
                    .max(30, 'Tối đa 30 kí tự')
            })}
        >
            {formProps => (
                <Form>
                    <TextField field="name" displayName="Thể loại" />

                    <div className="form-group mt-3">
                        <Btn disabled={formProps.isSubmitting} type="submit">Lưu lại</Btn>
                        <Link className="btn btn-md btn-warning ms-3" to="/the-loai">Hủy</Link>
                    </div>
                </Form>
            )}
        </Formik>
    );
}