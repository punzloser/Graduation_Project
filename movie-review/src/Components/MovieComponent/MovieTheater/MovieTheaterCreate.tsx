import { MovieTheaterForm } from "./MovieTheaterForm";

export const MovieTheaterCreate = () => {
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Khởi tạo</h3>
            <MovieTheaterForm
                model={{ name: '' }}
                onSubmit={async e => {
                    await new Promise(res => setTimeout(res, 1000));
                    console.log(e);
                }}
            />
        </div>
    );
}