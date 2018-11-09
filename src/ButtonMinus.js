import React from 'react';
import classNames from 'classnames';
import './styles/delBtn.css';

export default function ButtonMinus(props) {
    const size = {
        width: props.size + "px",
        height: props.size + "px"
    }

    return (<div className={props.className}  style={size} onClick={props.action}/>)
}