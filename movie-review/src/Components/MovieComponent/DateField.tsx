import { ErrorMessage, useFormikContext } from "formik";

interface IDateField {
    displayName: string,
    field: string
}

export const DateField = (props: IDateField) => {
    const { values, validateForm } = useFormikContext<any>();
    return (
        <div className="mb-3">
            <label htmlFor={props.field}>{props.displayName}</label>
            <input className="form-control" type="date"
                name={props.field}
                id={props.field}
                onChange={e => {
                    const date = new Date(e.currentTarget.value);
                    values[props.field] = date;
                    validateForm();
                }}
            />
            <ErrorMessage name={props.field}>
                {msg => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
        </div>
    );
}