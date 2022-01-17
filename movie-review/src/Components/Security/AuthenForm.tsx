import { Form, Formik, FormikHelpers } from "formik";
import { userCredsRequest } from "./IAuth";
import * as yup from 'yup';
import { TextField } from "../MovieComponent/TextField";
import { Btn } from "../Utilities/Btn";
import { Link } from "react-router-dom";
import './AuthenForm.css'

interface IAuthenForm {
    model: userCredsRequest,
    onSubmit(values: userCredsRequest, actions: FormikHelpers<userCredsRequest>): void
}

export const AuthenForm = (props: IAuthenForm) => {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={yup.object({
                email: yup.string().required('Nhập email.').email('Định dạng không hợp lệ.'),
                pass: yup.string().required('Nhập mật khẩu.')
            })}
        >
            {formProps => (
                <div className="wrapper">
                    <Form>
                        <TextField displayName="Email" field="email" />
                        <TextField displayName="Mật khẩu" field="pass" type="password" />
                        <div className="mt-3">
                            <Btn type="submit" disabled={formProps.isSubmitting}>Xác nhận</Btn>
                            <Link className="btn btn-md btn-warning ms-2" to="/">Hủy</Link>
                        </div>
                    </Form>
                </div>
            )}

        </Formik>
    );
}