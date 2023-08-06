import React from 'react';
import logo from './logo.svg';
// import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ModalDiv from "../Other/ModalDiv";


import style from './LeftBar.module.css'
function LeftBar() {
    return (
        <div className={`${style.container}`}>
            {/*<Button variant="outline-success" className={style.createButton}>Создать</Button>*/}
            <DropdownButton className={`${style.createButton}`} id="dropdown-item-button" title="Создать">
                {/*<Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>*/}
                {/*<Dropdown.Item as="button">Action</Dropdown.Item>*/}

                <ModalDiv isFolder={false} /> {/* Создание файла */}
                <ModalDiv isFolder={true} /> {/* Создание папки */}
                <Form.Control type="file" multiple />

            </DropdownButton>
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
