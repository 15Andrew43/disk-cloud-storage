import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


import style from './FileItem.module.css';
import {deleteFile} from "../../http/api";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../pages/Body/Body";



interface FileItemProps {
    name: string;
    owner: string;
    modifiedTime: string;
    size: number;
}


function FileItem({ name, owner, modifiedTime, size }: FileItemProps) {
    const dispatch = useDispatch();

    const fileType = getFileType(name);
    const iconClassName = getFileIconClassName(fileType);

    const [showModal, setShowModal] = useState(false);

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowModal(true);
    };

    const cur_path_arr: any = useSelector<any>((state) => {
        return state.app.cur_path;
    });

    const handleDelete = async () => {
        await deleteFile(cur_path_arr.join('') + name + '/');
        fetchData(cur_path_arr, dispatch);
    }


    return (
        <>
            <div className={style.fileItem} onContextMenu={(e) => handleContextMenu(e)}>
                <i className={iconClassName}></i>
                <div className={style.fileName}>{name}</div>
                <div className={style.owner}>{owner}</div>
                <div className={style.modifiedTime}>{modifiedTime}</div>
                <div className={style.size}>{size}</div>
            </div>

            {/* Модальное окно */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Действия с файлом</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Кнопки "Открыть", "Скачать", "Переименовать", "Удалить" */}
                    <Button variant="primary" onClick={() => console.log('Открыть')}>
                        Открыть
                    </Button>
                    <Button variant="primary" onClick={() => console.log('Скачать')}>
                        Скачать
                    </Button>
                    <Button variant="primary" onClick={() => console.log('Переименовать')}>
                        Переименовать
                    </Button>
                    <Button variant="danger"
                            onClick={() => {
                                handleDelete();
                                setShowModal(false);
                                console.log('Удалить');
                            }}>
                        Удалить
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}





function getFileType(fileName: string): string {
    const fileExtension = fileName.split('.').pop();
    return fileExtension ? fileExtension.toLowerCase() : '';
}

function getFileIconClassName(fileType: string): string {
    switch (fileType) {
        case 'jpg':
        case 'png':
        case 'gif':
            return 'bi bi-file-image';
        case 'pdf':
            return 'bi bi-file-pdf';
        default:
            return 'bi bi-file';
    }
}

export default FileItem;

