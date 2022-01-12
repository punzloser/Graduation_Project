import { ErrorMessage, Field } from "formik"

interface ITextField {
    field: string,
    displayName: string,
    type: 'text' | 'password'
}
export const TextField = (props: ITextField) => {
    return (
        <div className="form-group w-50">
            <label htmlFor={props.field}>{props.displayName}</label>
            <Field
                type={props.type} className="form-control" name={props.field} id={props.field}
                style={{ width: '100vh' }}
            />
            <ErrorMessage name={props.field}>
                {msg => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
        </div>
    )
}

TextField.defaultProps = {
    type: 'text'
}