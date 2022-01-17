import { ErrorMessage, Field } from "formik"
import React from "react"
import './TextField.css'

interface ITextField {
    field: string,
    displayName: string,
    type: 'text' | 'password',
    customIcon?: React.ReactElement
}
export const TextField = (props: ITextField) => {
    return (
        <div className="form-group w-50">
            <label htmlFor={props.field}>
                {props.customIcon ? <div className="me-2 d-inline">{props.customIcon}</div> : null}
                {props.displayName}
            </label>
            <Field
                type={props.type} className="form-control form-field" name={props.field} id={props.field}
                style={{ width: '50vh' }}
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