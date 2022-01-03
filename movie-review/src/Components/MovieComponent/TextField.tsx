import { ErrorMessage, Field } from "formik"

interface ITextField {
    field: string,
    displayName: string
}
export const TextField = (props: ITextField) => {
    return (
        <div className="form-group w-50">
            <label htmlFor={props.field}>{props.displayName}</label>
            <Field className="form-control" name={props.field} id={props.field} />
            <ErrorMessage name={props.field}>
                {msg => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
        </div>
    )
}