import React from 'react';
import './styles/cell.css';
import './styles/delBtn.css';
import './styles/addBtn.css';

export default function Cell(props) {
  const size = {
    width: props.size + 'px',
    height: props.size + 'px',
    left: props.positionLeft ? props.positionLeft + 'px' : null,
    top: props.positionTop ? props.positionTop + 'px' : null
  };

  const dataRow = typeof props.row !== 'undefined' ? props.row : undefined;
  const dataCol = typeof props.col !== 'undefined' ? props.col : undefined;

  let className = props.className;

  if ((size.left || size.top) != null) {
    className = 'squere squere-minus';
    if (props.className === 'squere-minus_visible') {
      className = 'squere squere-minus squere-minus_visible';
    }
  }

  return (
    <div
      className={className}
      data-row={dataRow}
      data-col={dataCol}
      onClick={props.action ? props.action : null}
      style={size}
    />
  );
}
