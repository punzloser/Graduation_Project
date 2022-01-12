import { Link, NavLink } from "react-router-dom";
import { Authorized } from "../Security/Authorized";

export const Menu = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Movie Review</Link>
                    <div className="collapse navbar-collapse d-flex justify-content-between">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Authorized
                                role="admin"
                                authorized={
                                    <>
                                        <li className="navbar-item me-3">
                                            <NavLink to="/the-loai">Thể loại</NavLink>
                                        </li>
                                        <li className="navbar-item me-3">
                                            <NavLink to="/dien-vien">Diễn viên</NavLink>
                                        </li>
                                        <li className="navbar-item me-3">
                                            <NavLink to="/rap">Rạp</NavLink>
                                        </li>
                                        <li className="navbar-item me-3">
                                            <NavLink to="/phim">Phim</NavLink>
                                        </li>
                                    </>
                                } />
                            <li className="navbar-item">
                                <NavLink to="/filter">Bộ lọc</NavLink>
                            </li>
                        </ul>
                        <div className="text-info d-flex">
                            <Authorized
                                authorized={
                                    <>
                                    </>
                                }
                                notAuthorized={
                                    <>
                                        <Link className="nav-link btn btn-link" to={'dang-nhap'} children='Đăng nhập' />
                                        <Link className="nav-link btn btn-link" to={'dang-ky'} children='Đăng ký' />
                                    </>
                                }
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}