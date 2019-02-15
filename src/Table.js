import React from 'react';
import classNames from 'classnames';
import './styles/tableStyle.css';
import Cell from './Cell';

function createGrid(row, col) {
  const tableGrid = [];

  for (let r = 0; r <= row - 1; r++) {
    tableGrid[r] = { row: r, cells: Array.from({ length: col }, (v, k) => k) };
  }

  return tableGrid;
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    let tableGrid = createGrid(
      this.props.initialHeight,
      this.props.initialWidth
    );
    this.oldColIndex = 0;
    this.offsets = {
      offsetLeft: 3,
      offsetTop: 3
    };

    this.hovered = {
      col: null,
      row: null
    };

    this.state = {
      grid: tableGrid,
      visible: {
        up: false,
        left: false
      }
    };
  }

  rowAdd = e => {
    this.setState((state, props) => {
      return {
        grid: [
          ...state.grid,
          {
            row: state.grid[state.grid.length - 1].row + 1,
            cells: [...state.grid[0].cells]
          }
        ]
      };
    });
  };

  colAdd = e => {
    this.setState((state, props) => {
      const updatedGrid = [...state.grid];
      const cellsLength = updatedGrid[updatedGrid.length - 1].cells.length - 1;
      const newCell =
        updatedGrid[updatedGrid.length - 1].cells[cellsLength] + 1;
      updatedGrid.forEach(item => item.cells.push(newCell));

      return {
        grid: updatedGrid
      };
    });
  };

  delRow = e => {
    if (this.state.grid.length <= 1) return false;

    // setTimeout(() => {
    this.setState((state, props) => {
      const updatedGrid = state.grid.filter(
        item => item.row !== this.hovered.row
      );

      this.hovered = {
        col: null,
        row: null
      };

      return {
        grid: updatedGrid,
        visible: {
          up: false,
          left: false
        }
      };
    });
    // }, 200);
  };

  delCol = e => {
    if (this.state.grid[0].cells.length <= 1 || this.hovered.col == null)
      return false;

    // setTimeout(() => {
    this.setState((state, props) => {
      const updatedGrid = [...state.grid];
      updatedGrid.forEach(item => {
        item.cells.splice(this.hovered.col, 1);
      });
      this.hovered = {
        col: null,
        row: null
      };
      this.oldColIndex = null;

      return {
        grid: updatedGrid,
        visible: {
          up: false,
          left: false
        }
      };
    });
    // }, 200);
  };

  tableOver = e => {
    const target = e.target;
    let visibleLeft;
    let visibleTop;

    if (
      target.className === 'squere' ||
      target.className === 'row' ||
      target.className === 'squere squere-minus squere-minus_visible' ||
      target.className === 'squere squere-minus' ||
      target.className === 'center'
    ) {
      let rowIndex;
      let colIndex;

      if (typeof target.dataset.row !== 'undefined')
        rowIndex = Number.parseInt(target.dataset.row);
      else rowIndex = this.hovered.row;
      if (typeof target.dataset.col !== 'undefined')
        colIndex = Number.parseInt(target.dataset.col);
      else colIndex = this.oldColIndex;

      //current targeting row in state
      const rowTarget = this.state.grid.find(item => item.row === rowIndex);

      //current targeting col in state
      let colTarget;
      this.state.grid.forEach(item => {
        let currentCell = item.cells.find(cellItem => cellItem === colIndex);
        colTarget = item.cells.indexOf(currentCell);
      });
      colTarget =
        colTarget === -1 || colTarget === null ? this.hovered.col : colTarget;

      //offsets
      let offsetLeft =
        colTarget === -1 ? this.offsets.offsetLeft : 3 + colTarget * 52;

      let offsetTop = 3 + this.state.grid.indexOf(rowTarget) * 52;
      if (offsetTop < 3) offsetTop = 3;

      this.oldColIndex = colIndex;
      this.offsets = {
        offsetLeft,
        offsetTop
      };
      this.hovered = {
        row: rowIndex,
        col: colTarget
      };

      visibleLeft = this.state.grid.length !== 1 && this.hovered.row != null;
      visibleTop =
        this.state.grid[0].cells.length !== 1 && this.hovered.col != null;
    } else {
      visibleLeft = false;
      visibleTop = false;
    }

    this.setState({
      visible: {
        up: visibleTop,
        left: visibleLeft
      }
    });
  };

  tableOut = e => {
    const target = e.target;

    if (
      !(
        target.className === 'squere squere-minus squere-minus_visible' ||
        target.className === 'squere squere-minus' ||
        target.className === 'squere' ||
        target.className === 'row'
      )
    ) {
      this.setState({
        visible: {
          up: false,
          left: false
        }
      });
    }
  };

  render() {
    return (
      <div
        onMouseOver={this.tableOver}
        onMouseOut={this.tableOut}
        className="squeres-folder"
      >
        <div className="up">
          <Cell
            className={classNames({
              'squere-minus_visible': this.state.visible.up
            })}
            action={this.delCol}
            size={this.props.cellSize}
            positionLeft={this.offsets.offsetLeft}
          />
        </div>
        <div className="wrapper">
          <div className="left">
            <Cell
              className={classNames({
                'squere-minus_visible': this.state.visible.left
              })}
              action={this.delRow}
              size={this.props.cellSize}
              positionTop={this.offsets.offsetTop}
            />
          </div>
          <div className="center">
            {//Генерация матрицы
            this.state.grid.map(valueRow => (
              <div key={valueRow.row} data-row={valueRow.row} className="row">
                {valueRow.cells.map(valueCol => (
                  <Cell
                    className="squere"
                    key={valueCol}
                    row={valueRow.row}
                    col={valueCol}
                    size={this.props.cellSize}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="right">
            <Cell
              className={'squere squere-plus'}
              action={this.colAdd}
              size={this.props.cellSize}
            />
          </div>
        </div>
        <div className="bottom">
          <Cell
            className={'squere squere-plus'}
            action={this.rowAdd}
            size={this.props.cellSize}
          />
        </div>
      </div>
    );
  }
}

export default Table;
