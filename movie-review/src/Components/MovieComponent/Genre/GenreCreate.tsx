import { defaultGenre } from "./defaultGenre";
import { GenreForm } from "./GenreForm";

export const GenreCreate = () => {

    return (
        <div className="container-fluid">
            <h3 className="text-muted">Khởi tạo</h3>
            <GenreForm
                initValue={defaultGenre}
                onSubmit={async e => {
                    await new Promise(res => setTimeout(res, 1000));
                    console.log(e)
                }}
            />

        </div>
    );
}