import React from 'react';
import classNames from 'classnames';
import './styles/addBtn.css';

export default function ButtonPlus(props) {
    const size = {
        width: props.size + "px",
        height: props.size + "px"
    }

    return (<div className={props.className}  style={size} onClick={props.action}/>)
}