import React from 'react';
import './styles/cell.css';

export default function Cell(props) {
    const size = {
        width: props.size + "px",
        height: props.size + "px"
    };



    return (<div className={props.className} data-row={props.row} data-col={props.col}  style={size}></div>) 
}