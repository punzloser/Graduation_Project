import { Field, useFormikContext } from "formik";
import ReactMarkdown from "react-markdown";
import './MarkdownField.css'

interface IMarkdownField {
    displayName: string,
    field: string,
    isDemo?: boolean
}

export const MarkdownField = (props: IMarkdownField) => {
    const { values } = useFormikContext<any>();
    return (
        <div className="d-flex my-5">
            <div>
                <label htmlFor={props.field}>{props.displayName}</label>
                <Field
                    style={{ resize: 'none' }}
                    className="biography"
                    id={props.field}
                    name={props.field}
                    as="textarea" />
            </div>
            {!props.isDemo ? null :
                <div>
                    <label htmlFor={props.field}>{props.displayName} (Xem trước) </label>
                    <div className="demo">
                        <ReactMarkdown>{values[props.field]}</ReactMarkdown>
                    </div>

                </div>
            }


        </div>
    );
}

MarkdownField.defaultProps = {
    isDemo: true
}

