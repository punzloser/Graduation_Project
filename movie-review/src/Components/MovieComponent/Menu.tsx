import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthenContext } from "../Security/AuthenContext";
import { Authorized } from "../Security/Authorized";
import { removeToken } from "../Security/handleJwt";
import { Btn } from "../Utilities/Btn";
import './Menu.css';

export const Menu = () => {
    const { update, claims } = useContext(AuthenContext);
    const history = useHistory();

    const getMailUser = () => {
        return claims.filter(a => a.name === 'email')[0]?.value;
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">

                        <div className="text middle" style={{width: '120px'}}>
                            <span>M</span>
                            <span className="hidden">o</span>
                            <span className="hidden">v</span>
                            <span className="hidden">i</span>
                            <span className="hidden">e</span>
                            <span> </span>
                            <span>R</span>
                            <span className="hidden">e</span>
                            <span className="hidden">v</span>
                            <span className="hidden">i</span>
                            <span className="hidden">e</span>
                            <span className="hidden">w</span>
                        </div>

                    </Link>
                    <div className="collapse navbar-collapse d-flex justify-content-between">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="navbar-item me-4">
                                <NavLink to="/">
                                    <FontAwesomeIcon icon="tachometer-alt" className="me-1" />Trang chủ
                                </NavLink>
                            </li>
                            <Authorized
                                role="admin"
                                authorized={
                                    <>
                                        <li className="navbar-item me-4">
                                            <NavLink to="/the-loai">
                                                <FontAwesomeIcon icon="address-book" className="me-1" />Thể loại
                                            </NavLink>
                                        </li>
                                        <li className="navbar-item me-4">
                                            <NavLink to="/dien-vien">
                                                <FontAwesomeIcon icon="hat-cowboy" className="me-1" />Diễn viên
                                            </NavLink>
                                        </li>
                                        <li className="navbar-item me-4">
                                            <NavLink to="/rap">
                                                <FontAwesomeIcon icon="theater-masks" className="me-1" />Rạp
                                            </NavLink>
                                        </li>
                                        <li className="navbar-item me-4">
                                            <NavLink to="/phim">
                                                <FontAwesomeIcon icon="file-video" className="me-1" />Phim
                                            </NavLink>
                                        </li>
                                        <li className="navbar-item me-4">
                                            <NavLink to="/tai-khoan">
                                                <FontAwesomeIcon icon="user" className="me-1" />Tài khoản
                                            </NavLink>
                                        </li>
                                    </>
                                } />
                            <li className="navbar-item">
                                <NavLink to="/filter">
                                    <FontAwesomeIcon icon="filter" className="me-1" />Bộ lọc
                                </NavLink>
                            </li>
                        </ul>
                        <div className="text-info d-flex">
                            <Authorized
                                authorized={
                                    <>
                                        <span className="nav-link">{getMailUser()} </span>
                                        <Btn children="Thoát"
                                            onClick={() => {
                                                removeToken();
                                                update([]);
                                                history.push("/");
                                            }}
                                        />
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