import React from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ModalDiv from "../Other/ModalDiv";


import style from './LeftBar.module.css'
import {addFile, API_URL} from "../../http/api";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../pages/Body/Body";
function LeftBar() {
    const dispatch = useDispatch();

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
            await addFile(cur_path_arr.join(''), 'upload', event.target.files[i]);
        }
        // var r = await addFile(cur_path_arr.join(''), 'upload', selectedFile);

        // console.log("response", r);

        fetchData(cur_path_arr, dispatch);


      //////////////////////////////////////////////////////////////////////////////////

    }


    return (
        <div className={`${style.container}`}>
            {/*<Button variant="outline-success" className={style.createButton}>Создать</Button>*/}
            <DropdownButton className={`${style.createButton}`} id="dropdown-item-button" title="Создать">
                {/*<Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>*/}
                {/*<Dropdown.Item as="button">Action</Dropdown.Item>*/}

                <ModalDiv isFolder={false} /> {/* Создание файла */}
                <ModalDiv isFolder={true} /> {/* Создание папки */}
                <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />

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
