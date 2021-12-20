import { Field, useFormikContext } from "formik";
import ReactMarkdown from "react-markdown";
import './MarkdownField.css'

interface IMarkdownField {
    displayName: string,
    field: string
}

export const MarkdownField = (props: IMarkdownField) => {
    const { values } = useFormikContext<any>();
    return (
        <div className="d-flex">
            <div>
                <label htmlFor={props.field}>{props.displayName}</label>
                <Field
                    style={{ resize: 'none' }}
                    className="biography"
                    id={props.field}
                    name={props.field}
                    as="textarea" />
            </div>
            <div>
                <label htmlFor={props.field}>{props.displayName} (Xem trước) </label>
                <div className="demo">
                    <ReactMarkdown>{values[props.field]}</ReactMarkdown>
                </div>
            </div>

        </div>
    );
}

