import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import FileItem from "./FileItem";


import style from './FileList.module.css'



interface File {
    name: string;
    owner: string;
    modifiedTime: string;
    size: string;
}

interface FileListProps {
    files: File[];
}

function FileList(props: FileListProps) {
    const { files } = props;

    return (
        <div>
            {files.map((file, index) => (
                <FileItem
                    key={index}
                    name={file.name}
                    owner={file.owner}
                    modifiedTime={file.modifiedTime}
                    size={file.size}
                />
            ))}
        </div>
    );
}

export default FileList;

