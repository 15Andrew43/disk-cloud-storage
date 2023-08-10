import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


import style from './FileItem.module.css';
import {deleteFile, listFiles} from "../../http/api";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../pages/Body/Body";
import {popFromCurPath, pushToCurPath, setCurPath} from "../../redux/store";
import fileList from "./FileList";
import {useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';




interface FileItemProps {
    name: string;
    fileType: string,
    owner: string;
    modifiedTime: string;
    size: number;
}


function FileItem({  name, fileType, owner, modifiedTime, size }: FileItemProps) {
    const dispatch = useDispatch();
    const { random_url } = useParams();

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
        await deleteFile(cur_path_arr.join('') + name + '/', random_url);
        fetchData(cur_path_arr, dispatch, random_url);
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
            const response = await listFiles(cur_path_arr.join('') + name + '/', 'download', random_url);
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


    async function handleShare() {
        const response = await listFiles(cur_path_arr.join('') + name + '/', 'share', '');
        console.log('TTTTTTTTTT', response);
        alert(`http://localhost:3000/common/${response.data.common_url}`);
    }

    const [showRenameModal, setShowRenameModal] = useState(false);
    const [newPath, setNewPath] = useState('');
    const [currentPath, setCurrentPath] = useState<string>(''); // Укажите тип строка

    const handleRenameClick = (currentFilePath: string) => {
        setCurrentPath(currentFilePath);
        setShowRenameModal(true);
    };

    const handleRenameModalSave = () => {
        console.log('Новый путь:', newPath);

        setShowRenameModal(false);
    };



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
                    <Button variant="primary"
                            onClick={() => {console.log('Открыть')}}
                    >
                        Открыть
                    </Button>
                    <Button variant="primary"
                            onClick={() => {
                                handleShare();
                                console.log('Открыть')
                            }}
                    >
                        Поделиться
                    </Button>
                    <Button variant="primary"
                            onClick={() => {
                                handleDownload();
                                console.log('Скачать');
                            }
                    }>
                        Скачать
                    </Button>
                    <Button variant="primary"
                            onClick={() => {
                                setShowRenameModal(true);
                                console.log('Переименовать')
                            }
                    }>
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

            <Modal show={showRenameModal} onHide={() => setShowRenameModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение пути {cur_path_arr.join('') + name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={newPath}
                        onChange={(e) => setNewPath(e.target.value)}
                        placeholder="Введите новый путь"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRenameModal(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleRenameModalSave}>
                        Сохранить
                    </Button>
                </Modal.Footer>
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
        case 'doc':
        case 'docx':
            return 'bi bi-file-word';
        case 'xls':
        case 'xlsx':
            return 'bi bi-file-excel';
        case 'ppt':
        case 'pptx':
            return 'bi bi-file-powerpoint';
        case 'txt':
            return 'bi bi-file-text';
        case 'mp3':
        case 'wav':
            return 'bi bi-file-music';
        // Добавьте другие типы файлов по аналогии
        default:
            return 'bi bi-file';
    }
}


export default FileItem;

