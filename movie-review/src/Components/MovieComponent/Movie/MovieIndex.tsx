import { Link } from "react-router-dom";

export const MovieIndex = () => {
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Phim</h3>
            <div className="btn-group">
                <Link className="btn btn-lg btn-primary" to="/phim/them">Khởi tạo</Link>
                <Link className="btn btn-lg btn-dark" to="/">↲</Link>
            </div>
        </div>
    );
}