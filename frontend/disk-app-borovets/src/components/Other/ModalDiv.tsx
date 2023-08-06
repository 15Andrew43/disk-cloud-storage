import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from './ModalDiv.module.css';

interface ModalDivProps {
    isFolder: boolean;
}

function ModalDiv({ isFolder }: ModalDivProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className={`${style.customButton}`} variant="primary" onClick={handleShow}>
                {isFolder ? 'Создать папку' : 'Создать .txt файл'}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isFolder ? 'Создать папку' : 'Создать .txt файл'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{isFolder ? 'Название папки' : 'Название файла'}</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        {!isFolder && (
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Содержимое файла</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDiv;
