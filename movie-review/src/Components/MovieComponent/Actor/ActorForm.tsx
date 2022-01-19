import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { Btn } from "../../Utilities/Btn";
import { TextField } from "../TextField";
import { actorCreationDTO } from "./IActor";
import * as Yup from "yup";
import { DateField } from "../DateField";
import { ImageField } from "../ImageField";
import { MarkdownField } from "../MarkdownField";

interface actorCreationDTOForm {
    model: actorCreationDTO,
    onSubmit(value: actorCreationDTO, action: FormikHelpers<actorCreationDTO>): void
}

export const ActorForm = (props: actorCreationDTOForm) => {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required('Nhập thể loại').firstLetterUppercase(),
                dob: Yup.date().nullable().required('Nhập ngày')
            })}
        >
            {formProps => (
                <Form className="w-75">
                    <TextField displayName="Tên nhân vật" field="name" />
                    <DateField displayName="Ngày sinh" field="dob" />
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