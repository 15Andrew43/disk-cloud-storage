import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from './ModalDiv.module.css';
import {addFile} from "../../http/api";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../pages/Body/Body";

interface ModalDivProps {
    isFolder: boolean;
}

function ModalDiv({ isFolder }: ModalDivProps) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const cur_path_arr: any = useSelector<any>((state) => {
        console.log("body1111!");
        console.log(state);
        console.log(localStorage.getItem('token'));
        // console.log("\n\n\n");
        // console.log(typeof state.app.cur_path);
        // console.log("\n\n\n");
        return state.app.cur_path;
    });

    const handleClose = () => {
        if (isFolder) {
            addFile(cur_path_arr.join(''), 'create', {file_name: fileName, file_type: 'Directory', file_content: ''});
        } else {
            addFile(cur_path_arr.join(''), 'create', {file_name: fileName, file_type: 'File', file_content: fileContent});
        }
        fetchData(cur_path_arr, dispatch);
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState('');

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
                            <Form.Control as="textarea"
                                          value={fileName}
                                          onChange={e => setFileName(e.target.value)}
                            />
                        </Form.Group>
                        {!isFolder && (
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Содержимое файла</Form.Label>
                                <Form.Control as="textarea"
                                              rows={3}
                                              value={fileContent}
                                              onChange={e => setFileContent(e.target.value)}
                                />
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
