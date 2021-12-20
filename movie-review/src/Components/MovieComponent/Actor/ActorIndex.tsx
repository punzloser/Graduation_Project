import { Link } from "react-router-dom";

export const ActorIndex = () => {
    return (
        <div className="container-fluid">
            <h3 className="text-muted">Diễn viên</h3>
            <div className="btn-group">
                <Link className="btn btn-lg btn-primary" to="/dien-vien/them">Khởi tạo</Link>
                <Link className="btn btn-lg btn-warning" to="/dien-vien/sua">Sửa đổi</Link>
            </div>
        </div>
    );
}