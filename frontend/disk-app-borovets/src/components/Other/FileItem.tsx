import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// import style from './FileItem.module.css'

import style from './FileItem.module.css';



interface FileItemProps {
    name: string;
    owner: string;
    modifiedTime: string;
    size: string;
}

function FileItem({ name, owner, modifiedTime, size }: FileItemProps) {
    const fileType = getFileType(name);
    const iconClassName = getFileIconClassName(fileType);

    return (
        <div className={style.fileItem}>
            <i className={iconClassName}></i>
            <div className={style.fileName}>{name}</div>
            <div className={style.owner}>{owner}</div>
            <div className={style.modifiedTime}>{modifiedTime}</div>
            <div className={style.size}>{size}</div>
        </div>
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

