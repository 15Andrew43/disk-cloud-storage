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


import style from './Body.module.css'

function Body() {
    return (
        <div className={`${style.container}`}>
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
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Люди">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Изменено">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className={`${style.sortbuttons}`}>
                {/*<Button as="input" type="button" value="Input" />{' '}*/}
                <Button as="input" type="button" value="Название" />{' '}
                <Button as="input" type="button" value="Владелец" />{' '}
                <DropdownButton id="dropdown-basic-button" title="Изменено">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <Button as="input" type="button" value="Размер" />{' '}
                {/*<Button as="input" type="button" value="Размер" />{' '}*/}

                {/*<Row className={`${style.line_file}`}>*/}
                {/*    <Col><Button as="input" type="button" value="Название" />{' '}</Col>*/}
                {/*    <Col><Button as="input" type="button" value="Владелец" />{' '}</Col>*/}
                {/*    <Col>*/}
                {/*        <DropdownButton id="dropdown-basic-button" title="Изменено">*/}
                {/*            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
                {/*            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
                {/*            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                {/*        </DropdownButton>*/}
                {/*    </Col>*/}
                {/*    <Col><Button as="input" type="button" value="Размер" />{' '}</Col>*/}
                {/*    <Col><Button as="input" type="button" value="Размер" />{' '}</Col>*/}
                {/*</Row>*/}
            </div>
            <div className={`${style.files} ${style.DivToScroll} ${style.DivWithScroll}`}>
                <Container >
                    {/*<Row className={`${style.line_file}`}>*/}
                    {/*    <Col>1 of 4</Col>*/}
                    {/*    <Col>2 of 4</Col>*/}
                    {/*    <Col>3 of 4</Col>*/}
                    {/*    <Col>4 of 4</Col>*/}
                    {/*</Row>*/}
                    {/*<Row className={`${style.line_file}`}>*/}
                    {/*    <Col>1 of 4</Col>*/}
                    {/*    <Col>2 of 4</Col>*/}
                    {/*    <Col>3 of 4</Col>*/}
                    {/*    <Col>4 of 4</Col>*/}
                    {/*</Row>*/}

                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>                    <div className={`${style.line_file}`}>
                        <div>1 of 4</div>
                        <div>2 of 4</div>
                        <div>3 of 4</div>
                        <div>4 of 4</div>
                    </div>

                </Container>
            </div>
        </div>
    );
}

export default Body;