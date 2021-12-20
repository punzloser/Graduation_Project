import { Link } from "react-router-dom";

export const MovieTheaterIndex = () => {
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Rạp</h3>
            <div className="btn-group">
                <Link className="btn btn-lg btn-primary" to="/rap/them">Khởi tạo</Link>
                <Link className="btn btn-lg btn-warning" to="/rap/sua">Sửa đổi</Link>
            </div>
        </div>
    );
}