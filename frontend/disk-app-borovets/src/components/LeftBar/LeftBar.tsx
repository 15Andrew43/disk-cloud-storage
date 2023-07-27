import React from 'react';
import logo from './logo.svg';
// import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import style from './LeftBar.module.css'
function LeftBar() {
    return (
        <div className={`${style.container}`}>
            <Button variant="outline-success" className={style.createButton}>Создать</Button>
            <div className={`${style.navigation}`}>
                <Nav.Link href="#action1">Мой диск</Nav.Link>
                <Nav.Link href="#action2">Общие файлы</Nav.Link>
                <Nav.Link href="#action3">Фото</Nav.Link>
                <Nav.Link href="#action4">Корзина</Nav.Link>
            </div>
        </div>
    );
}

export default LeftBar;
