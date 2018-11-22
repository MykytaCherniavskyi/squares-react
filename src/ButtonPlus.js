import React from 'react';
import './styles/addBtn.css';

export default function ButtonPlus(props) {
    const size = {
        width: props.size + "px",
        height: props.size + "px"
    }

    return (<div className={`squere squere-plus`}  style={size} onClick={props.action}/>)
}