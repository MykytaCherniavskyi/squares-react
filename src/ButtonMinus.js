import React from 'react';
import classNames from 'classnames';
import './styles/delBtn.css';

export default function ButtonMinus(props) {
    const size = {
        width: props.size + "px",
        height: props.size + "px",
        left: props.positionLeft + "px",
        top: props.positionTop + "px"
    }

    return (<div className={props.className}  style={size} onClick={props.action}/>)
}