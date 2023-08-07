import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Col, Row } from "react-bootstrap";
import style from "../Body/Body.module.css";
import {logout} from "../../http/api";
import {useSelector} from "react-redux";


// className={`d-flex ${style.my_style}`}

function Header() {
    // const isAuth = useSelector( state => state.is)
    return (
        <Navbar expand="lg" className="">
            <Container fluid>
            {/*<Container className={`${style.headerdivs}`}>*/}

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
                        <NavDropdown.Item href="#action3">Войти</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                            Настройки
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>
                            Выйти
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>

            </Container>
        </Navbar>

    );
}

export default Header;


