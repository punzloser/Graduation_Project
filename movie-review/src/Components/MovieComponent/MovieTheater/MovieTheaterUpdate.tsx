import { MovieTheaterForm } from "./MovieTheaterForm";

export const MovieTheaterUpdate = () => {
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Sửa đổi</h3>
            <MovieTheaterForm
                model={{ name: 'Test', latitude: 10.906450958330087, longitude: 106.85082979165058 }}
                onSubmit={async e => {
                    await new Promise(res => setTimeout(res, 1000));
                    console.log(e);
                }}
            />
        </div>
    );
}