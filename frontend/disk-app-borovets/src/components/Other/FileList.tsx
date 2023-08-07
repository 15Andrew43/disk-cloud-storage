import React from 'react';

import FileItem from "./FileItem";


import {FileInfo} from "../../redux/store";

interface FileListProps {
    files: FileInfo[];
}

function FileList(props: FileListProps) {
    const { files } = props;

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

