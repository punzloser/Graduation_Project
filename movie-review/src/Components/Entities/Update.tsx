import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { DisplayErrors } from "../Utilities/DisplayErrors";
import { Loading } from "../Utilities/Loading";
import { ReactElement } from "react-markdown/lib/react-markdown";

interface IUpdate<TCreation, TRead> {
    urlBase: string,
    urlIndex: string,
    transform(entity: TRead): TCreation,
    transformToFormData?(entity: TCreation): FormData
    children(entity: TCreation, update: (entity: TCreation) => void): ReactElement
}

export default function Update<TCreation, TRead>(props: IUpdate<TCreation, TRead>) {

    const history = useHistory();
    const { id }: any = useParams();
    const [entity, setEntity] = useState<TCreation>();
    const [errs, setErrs] = useState<string[]>([]);

    const update = async (model: TCreation) => {
        try {
            if (props.transformToFormData) {
                const formData = props.transformToFormData(model);
                await axios({
                    method: 'put',
                    url: `${props.urlBase}/${id}`,
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            } else {
                await axios.put(`${props.urlBase}/${id}`, model);
            }

            history.push(props.urlIndex);

        } catch (err: any) {
            if (err || err.response) {
                setErrs(err.response.data);
            }
        }
    };

    useEffect(() => {
        axios.get(`${props.urlBase}/${id}`)
            .then((response: AxiosResponse<TRead>) => {
                setEntity(props.transform(response.data));
            });
    }, [id]);

    return (
        <div className="container-fluid">
            <h3 className="text-muted">Sửa đổi</h3>
            <DisplayErrors errors={errs} />
            {!entity ? <Loading /> : props.children(entity, update)}
        </div>
    );
}

Update.defaultProps = {
    transform: (entity: any) => entity
}