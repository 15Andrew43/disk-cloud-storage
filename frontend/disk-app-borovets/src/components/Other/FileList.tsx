import React from 'react';

import FileItem from "./FileItem";


import {FileInfo} from "../../redux/store";
import {useSelector} from "react-redux";

interface FileListProps {
    files: FileInfo[];
}

function FileList(props: FileListProps) {
    const cur_path_arr: any = useSelector<any>((state) => {
        return state.app.cur_path;
    });

    const { files } = props;

    const newFileInfo: FileInfo = {
        name: '..',
        file_type: 'Directory',
        size: 0,
        created_time: '000000',
        modified_time: '000000'
    };

    // Добавляем новый элемент в начало массива
    if (cur_path_arr.length > 1) {
        files.unshift(newFileInfo);
    }



    return (
        <div>
            {files.map((file, index) => (
                <FileItem
                    key={index}
                    name={file.name}
                    fileType={file.file_type}
                    owner={"root"}
                    modifiedTime={file.modified_time}
                    size={file.size}
                />
            ))}
        </div>
    );
}

export default FileList;

