import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";

interface IImageField {
    displayName: string,
    imageUrl: string,
    field: string
}
export const ImageField = (props: IImageField) => {
    const [image64, setImage64] = useState('');
    const [imageUrl, setImageUrl] = useState(props.imageUrl);
    const { values } = useFormikContext<any>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0];
            if (file) {
                toBase64(file)
                    .then((base64Representation: string) => setImage64(base64Representation))
                    .catch(err => console.log(err));
                values[props.field] = file;
                setImageUrl('');
            } else {
                setImage64('');
            }
        }
    }

    const toBase64 = (file: File) => {
        return new Promise<string>((res, rej) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => res(reader.result as string);
            reader.onerror = (err) => rej(err);
        });
    }
    return (
        <div className="mb-3">
            <label htmlFor={props.field}>{props.displayName}</label>
            <input className="form-control"
                id={props.field}
                name={props.field}
                onChange={handleChange}
                type="file" accept=".jpg, .jpge, .png" />
            {
                !image64 ? null :
                    <div className="my-3">
                        <img
                            style={{ width: '200px', borderRadius: '10px' }}
                            src={image64} alt="selected" />
                    </div>
            }
            {
                !imageUrl ? null :
                    <div className="my-3">
                        <img
                            style={{ width: '200px', borderRadius: '10px' }}
                            src={imageUrl} alt="selected" />
                    </div>
            }
        </div>
    );
}

ImageField.defaultProps = {
    imageUrl: ''
}