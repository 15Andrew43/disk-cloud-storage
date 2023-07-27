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


// className={`d-flex ${style.my_style}`}

function Header() {
    return (
        <Navbar expand="lg" className="">
            <Container fluid>
                <Navbar.Brand href="#"><b>Диск</b></Navbar.Brand>

                    <Form className="d-flex" style={{width: "600px"}}>
                        <Form.Control
                            type="search"
                            placeholder="Поиск на диске"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Найти</Button>
                    </Form>

                <NavDropdown title="Аккаунт" id="navbarScrollingDropdown" style={{marginRight: "100px"}}>
                    <NavDropdown.Item href="#action3">Войти</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                        Настройки
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                        Выйти
                    </NavDropdown.Item>
                </NavDropdown>

            </Container>
        </Navbar>

    );
}

export default Header;


