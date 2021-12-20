import { useParams } from "react-router-dom";
import { GenreForm } from "./GenreForm";

export const GenreUpdate = () => {
    const { id }: any = useParams();
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Sửa đổi</h3>
            <GenreForm
                initValue={{ name: 'Update' }}
                onSubmit={async e => {
                    await new Promise(res => setTimeout(res, 1000));
                    console.log(e);
                    console.log(id);
                }}
            />
        </div>
    );
}