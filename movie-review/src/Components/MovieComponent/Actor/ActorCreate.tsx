import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { actorUrl } from "../../../endpoints";
import { DisplayErrors } from "../../Utilities/DisplayErrors";
import { ToFormData } from "../../Utilities/FormData";
import { ActorForm } from "./ActorForm";
import { defaultActor } from "./defaultActor";
import { actorCreationDTO } from "./IActor";

export const ActorCreate = () => {

    const history = useHistory();
    const [errs, setErrs] = useState<string[]>([]);

    const create = async (actor: actorCreationDTO) => {
        try {
            const formData = ToFormData(actor);

            await axios({
                method: 'post',
                url: actorUrl,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            history.push('/dien-vien');

        } catch (error: any) {
            if (error && error.response) {
                setErrs(error.response.data);
            }
        }
    }
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Khởi tạo</h3>
            <DisplayErrors errors={errs} />
            <ActorForm model={defaultActor} onSubmit={async e => {
                await create(e);
            }} />
        </div>
    );
}