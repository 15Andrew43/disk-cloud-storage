import React, {useEffect} from 'react';
import logo from './logo.svg';
// import './App.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import FileList from "../../components/Other/FileList";

import 'bootstrap/dist/css/bootstrap.min.css';


import style from './Body.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {addFile, listFiles} from "../../http/api";
import {useDispatch, useSelector} from "react-redux";
import {pushToCurPath, setCurPath, setFileList} from "../../redux/store";
import {Dispatch} from "redux";
import {useParams} from "react-router-dom";
import LeftBar from "../../components/LeftBar/LeftBar";
import ModalDiv from "../../components/Other/ModalDiv";
import Form from "react-bootstrap/Form";


function CreateButton() {
    const dispatch = useDispatch();
    const { random_url } = useParams();

    const cur_path_arr: any = useSelector<any>((state) => {
        return state.app.cur_path;
    });

    async function handleFileChange(event: any) {
        const selectedFile = event.target.files[0];
        console.log("selecteed file", selectedFile);

        if (selectedFile) {
            const fileName = selectedFile.name;
            const fileType = selectedFile.type;
            const fileSize = selectedFile.size;

            console.log('File Name:', fileName);
            console.log('File Type:', fileType);
            console.log('File Size:', fileSize, 'bytes');

            const reader = new FileReader();
            reader.onload = function (event: any) {
                const fileContent = event.target.result; // Содержимое файла в формате Data URL
                console.log('File Content:', fileContent);
            };
            reader.readAsDataURL(selectedFile);
        }

        ///////////////////////////////////////////////////////////////////////////////////

        for (let i = 0; i < event.target.files.length; i++) {
            await addFile(cur_path_arr.join(''), 'upload', event.target.files[i], random_url);
        }
        // var r = await addFile(cur_path_arr.join(''), 'upload', selectedFile);

        // console.log("response", r);

        fetchData(cur_path_arr, dispatch, random_url);


        //////////////////////////////////////////////////////////////////////////////////

    }


    return (
        <DropdownButton className={`${style.createButton}`} id="dropdown-item-button" title="Создать">
            <ModalDiv isFolder={false} /> {/* Создание файла */}
            <ModalDiv isFolder={true} /> {/* Создание папки */}
            <Form.Control
                type="file"
                multiple
                onChange={handleFileChange}
            />
        </DropdownButton>
    );
}


export const fetchData = async (cur_path_arr: string[], dispatch: Dispatch, random_url: string | undefined) => {
            try {
                console.log("random_url = ", random_url);
                const rp = await listFiles(cur_path_arr.join(''), 'ls', random_url);
                console.log("AAAAAAA");
                console.log(rp);
                dispatch(setFileList(rp.data.files));
                console.log("bruh");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


function Body() {
    const dispatch = useDispatch();
    const { random_url } = useParams();

    const cur_path_arr: any = useSelector<any>((state) => {
        return state.app.cur_path;
    });

    const file_list: any = useSelector<any>((state) => {
        return state.app.file_list;
    });

    useEffect(() => {
        fetchData(cur_path_arr, dispatch, random_url);
    }, [cur_path_arr]);

    // const handleBreadcrumbClick = (index: number) => {
    //     if (index === cur_path_arr.length - 1) {
    //         const initialPath = ['./']; // Измените на начальный путь, который вы хотите использовать
    //         dispatch(pushToCurPath(cur_path_arr)); // Сброс пути до начального значения
    //     } else {
    //         const newPath = cur_path_arr.slice(0, index + 1);
    //         dispatch(setCurPath(newPath)); // Обновление пути
    //     }
    // };
    const handleBreadcrumbClick = (index: number) => {
        const newPath = cur_path_arr.slice(0, index + 1);
        dispatch(setCurPath(newPath)); // Обновление пути
    };

    const modifiedPathNames = cur_path_arr.map((path: string) => {
        if (path === './') {
            return 'Мой диск';
        } else {
            return path.replace(/\//g, '');
        }
    });

    return (
        <>
            <CreateButton/>

        <div className={`${style.mainbody}`}>
            <h4 className={`${style.path}`}>
                {/*{cur_path_arr.join('')}*/}
                <Breadcrumb>
                    {modifiedPathNames.map((path: string, index: number) => (
                        <Breadcrumb.Item
                            key={index}
                            onClick={() => handleBreadcrumbClick(index)} // Добавляем обработчик клика
                        >
                            {path}
                        </Breadcrumb.Item>
                    ))}
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

                <FileList files={file_list} />

            </div>
        </div>
            </>
    );
}

export default Body;