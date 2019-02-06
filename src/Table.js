import React from 'react';
import classNames from 'classnames';
import './styles/tableStyle.css';
import Cell from './Cell';
import ButtonPlus from './ButtonPlus';
import ButtonMinus from './ButtonMinus';

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
    this.state = {
      grid: tableGrid,
      position: {
        col: 0,
        row: 0
      },
      visible: {
        up: false,
        left: false
      },
      offsets: {
        offsetLeft: 3,
        offsetTop: 3
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

    this.setState({
      visible: {
        up: false,
        left: false
      }
    });

    setTimeout(() => {
      this.setState((state, props) => {
        const updatedGrid = state.grid.filter(
          item => item.row != state.position.row
        );

        return {
          grid: updatedGrid
        };
      });
    }, 200);
  };

  delCol = e => {
    if (this.state.grid[0].cells.length <= 1) return false;

    this.setState({
      visible: {
        up: false,
        left: false
      }
    });

    setTimeout(() => {
      this.setState((state, props) => {
        const updatedGrid = [...state.grid];

        updatedGrid.forEach(item => {
          item.cells.splice(state.colTarget, 1);
        });

        return {
          grid: updatedGrid
        };
      });
    }, 200);
  };

  tableOver = e => {
    const target = e.target;

    if (
      target.className === 'bottom' ||
      target.className === 'right' ||
      target.className === 'up' ||
      target.className === 'left' ||
      target.className === 'squere squere-minus squere-minus_visible' ||
      target.className === 'squere squere-plus' ||
      target.className === 'squere squere-minus'
    ) {
      let visible = {
        up: this.state.grid[0].cells.length !== 1,
        left: this.state.grid.length !== 1
      };

      if (target.className === 'up' || target.className === 'left') {
        if (target.firstChild.className === 'squere squere-minus') {
          visible = {
            up: this.state.grid[0].cells.length !== 1,
            left: this.state.grid.length !== 1
          };
        } else {
          visible = {
            up: false,
            left: false
          };
        }
      }
      if (target.className === 'bottom' || target.className === 'right') {
        if (target.firstChild.className === 'squere squere-plus') {
          visible = {
            up: false,
            left: false
          };
        }
      }
      if (target.className === 'squere squere-minus squere-minus_visible') {
        visible = {
          up: this.state.grid[0].cells.length !== 1,
          left: this.state.grid.length !== 1
        };
      }
      if (target.className === 'squere squere-plus') {
        visible = {
          up: false,
          left: false
        };
      }
      if (target.className === 'squere squere-minus') {
        visible = {
          up: this.state.grid[0].cells.length !== 1,
          left: this.state.grid.length !== 1
        };
      }

      this.setState({
        visible
      });
    }

    if (target.className === 'squere' || target.className === 'row') {
      const rowIndex = target.dataset.row;
      const colIndex = target.dataset.col;

      //current targeting row in state
      const rowTarget = this.state.grid.find(item => item.row == rowIndex);

      //current targeting col in state
      let colTarget;
      this.state.grid.forEach(item => {
        let currentCell = item.cells.find(cellItem => cellItem == colIndex);
        colTarget = item.cells.indexOf(currentCell);
      });
      let offsetLeft =
        colTarget == -1 ? this.state.offsets.offsetLeft : 3 + colTarget * 52;

      this.setState({
        position: {
          row: rowIndex,
          col: colIndex
        },
        visible: {
          up: this.state.grid[0].cells.length !== 1,
          left: this.state.grid.length !== 1
        },
        offsets: {
          offsetLeft,
          offsetTop: 3 + this.state.grid.indexOf(rowTarget) * 52
        },
        colTarget
      });
    }
  };

  tableOut = e => {
    const target = e.target;

    let visible = {
      up: this.state.grid[0].cells.length !== 1,
      left: this.state.grid.length !== 1
    };
    if (
      !(
        target.className === 'squere-minus' ||
        target.className === 'squere' ||
        target.className === 'row' ||
        target.className === 'left' ||
        target.className === 'up' ||
        target.className === 'center'
      )
    ) {
      visible = {
        up: false,
        left: false
      };
    }

    this.setState({
      visible
    });
  };

  render() {
    return (
      <div
        onMouseOver={this.tableOver}
        onMouseOut={this.tableOut}
        className="squeres-folder"
      >
        <div className="up">
          <ButtonMinus
            className={classNames({
              'squere-minus_visible': this.state.visible.up
            })}
            action={this.delCol}
            size={this.props.cellSize}
            positionLeft={this.state.offsets.offsetLeft}
          />
        </div>
        <div className="wrapper">
          <div className="left">
            <ButtonMinus
              className={classNames({
                'squere-minus_visible': this.state.visible.left
              })}
              action={this.delRow}
              size={this.props.cellSize}
              positionTop={this.state.offsets.offsetTop}
            />
          </div>
          <div className="center">
            {//Генерация матрицы
            this.state.grid.map(valueRow => (
              <div key={valueRow.row} data-row={valueRow.row} className="row">
                {valueRow.cells.map(valueCol => (
                  <Cell
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
            <ButtonPlus action={this.colAdd} size={this.props.cellSize} />
          </div>
        </div>
        <div className="bottom">
          <ButtonPlus action={this.rowAdd} size={this.props.cellSize} />
        </div>
      </div>
    );
  }
}

export default Table;
