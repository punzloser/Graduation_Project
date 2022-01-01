import { ActorForm } from "./ActorForm";
import { useParams } from "react-router-dom";

export const ActorUpdate = () => {
    const id = useParams();
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Sửa đổi</h3>
            <ActorForm
                model={{
                    name: 'Thanh kute',
                    dob: new Date('1995/01/25'),
                    pictureUrl : 'https://i.pinimg.com/736x/ff/43/6b/ff436bc2ea8462b1cc02c17a296385bf.jpg'
                }}
                onSubmit={async e => {
                    await new Promise(res => setTimeout(res, 1000));
                    console.log(e);
                    console.log(id);
                }} />
        </div>
    );
}