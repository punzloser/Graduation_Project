import { ActorForm } from "./ActorForm";
import { defaultActor } from "./defaultActor";

export const ActorCreate = () => {
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Khởi tạo</h3>
            <ActorForm model={defaultActor} onSubmit={async e => {
                await new Promise(res => setTimeout(res, 1000));
                console.log(e);
            }} />
        </div>
    );
}