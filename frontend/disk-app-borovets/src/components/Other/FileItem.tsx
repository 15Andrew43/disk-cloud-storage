import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


import style from './FileItem.module.css';
import {deleteFile, listFiles} from "../../http/api";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../pages/Body/Body";
import {popFromCurPath, pushToCurPath, setCurPath} from "../../redux/store";



interface FileItemProps {
    name: string;
    fileType: string,
    owner: string;
    modifiedTime: string;
    size: number;
}


function FileItem({  name, fileType, owner, modifiedTime, size }: FileItemProps) {
    const dispatch = useDispatch();

    if (fileType === 'Directory') {
        var iconClassName = 'bi bi-folder-fill';
    } else { // fileType === 'File'
        var fileExtension = getFileExtension(name, fileType);
        var iconClassName = getFileIconClassName(fileExtension);
    }


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


    function handleDoubleClick() {
        // let new_path = [...cur_path_arr, name+'/'];
        if (fileType === 'Directory') {
            if (name === '..') {
                dispatch(popFromCurPath());
            } else {
                dispatch(pushToCurPath(name + '/'));
            }
        } else { // fileType === 'File'
            ;
        }

    }

    // does not work :(
    // async function handleDownload() {
    //     try {
    //         const response = await listFiles(cur_path_arr.join('') + name + '/', 'download');
    //         console.log("type if file = ", response.headers['content-type']);
    //         console.log("header = ", response.headers);
    //         const blob = new Blob([response.data], { type: response.headers['content-type'] });
    //         const url = URL.createObjectURL(blob);
    //
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = name; // Здесь можно указать имя файла
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //
    //         URL.revokeObjectURL(url);
    //     } catch (error) {
    //         console.error('Error downloading file:', error);
    //     }
    // }
///////////////////////////////////////////////////////////////////////////////////////////////////////
//
//     it works!!!
    async function handleDownload() {
        try {
            const response = await listFiles(cur_path_arr.join('') + name + '/', 'download');
            console.log("type if file = ", response.headers['content-type']);
            console.log("header = ", response.headers);
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = `${name}`;
              link.click();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <div className={style.fileItem}
                 onContextMenu={(e) => handleContextMenu(e)}
                 onDoubleClick={handleDoubleClick}
            >
                <i className={iconClassName}></i>
                <div className={style.fileName}>{name}</div>
                <div className={style.owner}>{owner}</div>
                <div className={style.modifiedTime}>{modifiedTime}</div>
                <div className={style.size}>{size}</div>
            </div>

            {/* Модальное окно */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Действия с файлом {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={style.modalButtons}>
                    {/* Кнопки "Открыть", "Скачать", "Переименовать", "Удалить" */}
                    <Button variant="primary" onClick={() => console.log('Открыть')}>
                        Открыть
                    </Button>
                    <Button variant="primary"
                            onClick={() => {
                                handleDownload();
                                console.log('Скачать');
                            }
                    }>
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


function getFileExtension(fileName: string, fileType: string): string {
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

