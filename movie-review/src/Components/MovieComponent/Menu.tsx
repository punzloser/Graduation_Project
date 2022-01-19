import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
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
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        <div className="text middle" style={{ width: '120px' }}>
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
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navScroll" />
                    <Navbar.Collapse id="navScroll">
                        <Nav className="me-auto align-items-center">
                            <Nav.Link as={Link} to="/">
                                <FontAwesomeIcon icon="tachometer-alt" className="me-1" />Trang chủ
                            </Nav.Link>

                            <Authorized
                                role="admin"
                                authorized={
                                    <>
                                        <Nav.Link as={Link} to="/the-loai">
                                            <FontAwesomeIcon icon="address-book" className="me-1" />Thể loại
                                        </Nav.Link>

                                        <Nav.Link as={Link} to="/dien-vien">
                                            <FontAwesomeIcon icon="hat-cowboy" className="me-1" />Diễn viên
                                        </Nav.Link>

                                        <Nav.Link as={Link} to="/rap">
                                            <FontAwesomeIcon icon="theater-masks" className="me-1" />Rạp
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/phim">
                                            <FontAwesomeIcon icon="file-video" className="me-1" />Phim
                                        </Nav.Link>

                                        <Nav.Link as={Link} to="/tai-khoan">
                                            <FontAwesomeIcon icon="user" className="me-1" />Tài khoản
                                        </Nav.Link>
                                    </>
                                }
                            />

                            <Nav.Link as={Link} to="/filter">
                                <FontAwesomeIcon icon="filter" className="me-1" />Bộ lọc
                            </Nav.Link>

                            <NavDropdown
                                id="navDropdown"
                                className="ms-auto"
                                title={
                                    <Authorized
                                        authorized={
                                            <>
                                                {getMailUser()}
                                            </>
                                        }
                                        notAuthorized={
                                            <>Cổng trời</>
                                        }
                                    />
                                }
                            >

                                <Authorized
                                    authorized={
                                        <>
                                            <NavDropdown.Item href="#action/3.1">
                                                <Btn children="Đăng xuất"
                                                    onClick={() => {
                                                        removeToken();
                                                        update([]);
                                                        history.push("/");
                                                    }}
                                                />
                                            </NavDropdown.Item>
                                        </>
                                    }
                                    notAuthorized={
                                        <>
                                            <Link className="btn btn-light w-100" to={'dang-nhap'} children='Đăng nhập' />
                                            <Link className="btn btn-info w-100" to={'dang-ky'} children='Đăng ký' />
                                        </>
                                    }
                                />
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}