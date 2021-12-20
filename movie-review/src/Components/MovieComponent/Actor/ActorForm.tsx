import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { Btn } from "../../Utilities/Btn";
import { TextField } from "../TextField";
import { IActor } from "./IActor";
import * as Yup from "yup";
import { DateField } from "../DateField";
import { ImageField } from "../ImageField";
import { MarkdownField } from "../MarkdownField";

interface IActorForm {
    model: IActor,
    onSubmit(value: IActor, action: FormikHelpers<IActor>): void
}

export const ActorForm = (props: IActorForm) => {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required('Nhập thể loại').firstLetterUppercase(),
                dateOfBirth: Yup.date().nullable().required('Nhập ngày')
            })}
        >
            {formProps => (
                <Form className="w-75">
                    <TextField displayName="Tên nhân vật" field="name" />
                    <DateField displayName="Ngày sinh" field="dateOfBirth" />
                    <MarkdownField displayName="Tiểu sử" field="biography" />
                    <ImageField displayName="Hình ảnh" field="picture" imageUrl={props.model.pictureUrl} />
                    <div className="mb-5">
                        <Btn type="submit" disabled={formProps.isSubmitting}>Lưu lại</Btn>
                        <Link className="btn btn-md btn-warning ms-2" to="/dien-vien">Hủy</Link>
                    </div>
                </Form>
            )}

        </Formik>
    );
}