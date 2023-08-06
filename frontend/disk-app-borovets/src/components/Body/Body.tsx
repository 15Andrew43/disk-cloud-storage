import React from 'react';
import logo from './logo.svg';
// import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FileList from "../Other/FileList";
import filesData from "../Other/filesData";

import 'bootstrap/dist/css/bootstrap.min.css';


import style from './Body.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css';





function Body() {
    return (
        <div className={`${style.mainbody}`}>
            <h4 className={`${style.path}`}>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Мой диск</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Андрей лох
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Хехех</Breadcrumb.Item>
            </Breadcrumb>
            </h4>
            {/*<h3 className={`${style.path}`}>Мой диск</h3>*/}
            <div className={`${style.filters}`}>
                <DropdownButton id="dropdown-basic-button" title="Тип">
                    <Dropdown.Item href="#/action-1">PDF</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Фото</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Папки</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Люди">
                    <Dropdown.Item href="#/action-1">Андрей</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Коля</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Мама</Dropdown.Item>
                    <Dropdown.Item href="#/action-4">Папа</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Изменено">
                    <Dropdown.Item href="#/action-1">Сегодня</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">За последние 7 дней</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">За последние 30 дней</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className={`${style.sortbuttons}`}>
                <Button as="input" type="button" value="Название" />{' '}
                <DropdownButton id="dropdown-basic-button" title="Владелец">
                    <Dropdown.Item href="#/action-1">Андрей</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Коля</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Мама</Dropdown.Item>
                    <Dropdown.Item href="#/action-4">Папа</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Изменено">
                    <Dropdown.Item href="#/action-1">По дате изменения</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">По дате моих изменений</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">По дате просмотра</Dropdown.Item>
                </DropdownButton>
                <Button as="input" type="button" value="Размер" />{' '}
                <div></div> {/*мне похуй, я ничего лучше не придумал, чем пустой div, чтобы все сдвинулось влево*/}

            </div>
            <div className={`${style.DivToScroll} ${style.DivWithScroll}`}>

                <FileList files={filesData} />

            </div>
        </div>
    );
}

export default Body;