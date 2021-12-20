import { Field } from "formik";

interface ICheckBoxField {
    displayName: string,
    field: string
}

export const CheckBoxField = (props: ICheckBoxField) => {
    return (
        <div className="form-check">
            <label className="form-check-label" htmlFor={props.field}>{props.displayName}</label>
            <Field className="form-check-input" type="checkbox" id={props.field} name={props.field} />
        </div>
    );
}