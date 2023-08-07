import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {logout} from "../../http/api";
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";



// className={`d-flex ${style.my_style}`}

function Header() {
    const navigate = useNavigate();

      const isAuth = useSelector<any>((state) => {
          console.log("Header!");
          console.log(state);
          console.log(localStorage.getItem('token'));
          return state.app.is_auth;
      });


    function handleExit() {
        logout();
        navigate('/auth');
    }

    return (
        <Navbar expand="lg" className="">
            <Container fluid>
                <div><Navbar.Brand href="#"><b>Диск</b></Navbar.Brand></div>
                <div>
                    <Form className="d-flex" style={{width: "50vw"}}>
                        <Form.Control
                            type="search"
                            placeholder="Поиск на диске"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Найти</Button>
                    </Form>
                </div>

                <div>
                    <NavDropdown title="Аккаунт" id="navbarScrollingDropdown" style={{marginRight: "7vw"}}>
                        {
                            isAuth
                            ?
                                <></>
                            :
                            <NavDropdown.Item href="#action3">Войти</NavDropdown.Item>
                        }

                        <NavDropdown.Item href="#action4">
                            Настройки
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        {
                            isAuth
                            ?
                                <NavDropdown.Item onClick={handleExit}>
                                    Выйти
                                </NavDropdown.Item>
                                :
                                <></>
                        }

                    </NavDropdown>
                </div>
            </Container>
        </Navbar>

    );
}

export default Header;


