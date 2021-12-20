import { Link } from "react-router-dom";

export const GenreIndex = () => {
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Thể loại</h3>
            <div className="btn-group">
                <Link className="btn btn-lg btn-primary" to="/the-loai/them">Khởi tạo</Link>
                <Link className="btn btn-lg btn-warning" to="/the-loai/sua">Sửa đổi</Link>
            </div>
        </div>
    );
}