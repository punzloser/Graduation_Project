import { ActorForm } from "./ActorForm";
import { useParams } from "react-router-dom";
import Update from "../../Entities/Update";
import { actorCreationDTO, actorDTO } from "./IActor";
import { actorUrl } from "../../../endpoints";
import { ToFormData } from "../../Utilities/FormData";

export const ActorUpdate = () => {
    const id = useParams();

    const transform = (actor: actorDTO): actorCreationDTO => {
        return {
            name: actor.name,
            biography: actor.biography,
            dob: new Date(actor.dob),
            pictureUrl: actor.picture
        }
    }
    return (
        <>
            <Update<actorCreationDTO, actorDTO>
                urlBase={actorUrl}
                urlIndex="/dien-vien"
                transformToFormData={ToFormData}
                transform={transform}
            >
                {(actor, update) => (
                    <ActorForm
                        model={actor}
                        onSubmit={async e => {
                            await update(e)
                        }}
                    />
                )}

            </Update>
        </>
    );
}