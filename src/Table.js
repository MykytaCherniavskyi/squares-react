import React from 'react';
import classNames from 'classnames';
import './styles/tableStyle.css';
import Cell from './Cell';
import ButtonPlus from './ButtonPlus';
import ButtonMinus from './ButtonMinus';

function createGrid(row,col) {

    const tableGrid = [];

    for (let r = 0; r <= row - 1; r++) {
        tableGrid[r] = {row: r, cell: Array.from({length: col}, (v,k) => k) };
    }

    return tableGrid
}

class Table extends React.Component{

    constructor(props) {
        super(props);
        let tableGrid = createGrid(this.props.initialHeight,this.props.initialWidth);
        console.log(tableGrid)
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

    rowAdd = (e) => {        

        this.setState((state,props) => {
            return {
                grid: [...state.grid, {row: state.grid.length, cell: [...state.grid[0].cell]}]
            }
        });

    }

    colAdd = (e) => {

        this.setState((state,props) => {

            const {grid: updatedGrid} = state;
            const newCell = updatedGrid[updatedGrid.length - 1].cell.length;
            updatedGrid.forEach(item => item.cell.push(newCell));
            
            return {
                grid: updatedGrid
            }
        })

    }

    delRow = (e) => {
        if (this.state.grid.length <= 1) return false

        this.setState({
            visible: {
                up: false,
                left: false
            }
        });


        setTimeout(() => {
    
            this.setState((state,props) => {

                const updatedGrid = state.grid.filter((item) => {
                    if  (item.row != state.position.row)
                        return true 
                })

                updatedGrid.forEach((item,index) => {
                    if (state.position.row <= index) updatedGrid[index].row -= 1;
                })

                return {
                    grid: updatedGrid
                }

            })

        },200);

    }

    delCol = (e) => {

        if (this.state.grid[0].cell.length <= 1) return false

        this.setState({
            visible: {
                up: false,
                left: false
            }
        });

        

        setTimeout(() => {

            this.setState((state,props) => {

                const {grid: updatedGrid} = state;

                updatedGrid.forEach((item) => {
                    item.cell.splice(state.position.col,1);
                    item.cell.forEach((itemCell,index) => { 
                        if (state.position.col <= index) {
                            item.cell[index] -= 1;
                        }
                    })
                });
                
                return {
                    grid: updatedGrid
                }

            })

        },200);


    }

    tableOver = (e) => {

        const target = e.target;

        if ( target.className === 'squere'
            || target.className === 'row'
            || target.className === 'squere squere-minus') {


                const rowIndex = target.dataset.row;
                const colIndex = target.dataset.col;

                this.setState({
                    position: {
                        row: rowIndex,
                        col: colIndex
                    },
                    visible: {
                        up: this.state.grid[0].cell.length === 1 ? false : true,
                        left: this.state.grid.length === 1 ? false : true
                    },
                    offsets: {
                        offsetLeft: 3 + colIndex * 52,
                        offsetTop: 3 + rowIndex * 52,
                    }
                })

            }

    }

    tableOut = (e) => {

        const target = e.target;
        

        if (!(target.className === 'squere-minus'
            || target.className === 'squere'
            || target.className === 'row'
            || target.className === 'left'
            || target.className === 'up'
            || target.className === 'center')) {
            
            this.setState({
                visible: {
                    up: false,
                    left: false
                }
            })

        }


    }


    render () {

        return (
            <div ref={this.ref} onMouseOver={this.tableOver} onMouseOut={this.tableOut} className="squeres-folder">
                <div className="up">
                    <ButtonMinus 
                        className={classNames({'squere-minus_visible': this.state.visible.up})}
                        action = {this.delCol}
                        size = {this.props.cellSize}
                        positionLeft = {this.state.offsets.offsetLeft}
                     />
                </div>
                <div className="wrapper">
                    <div className="left">
                        <ButtonMinus
                            className={classNames({'squere-minus_visible': this.state.visible.left})}
                            action = {this.delRow}
                            size = {this.props.cellSize}
                            positionTop = {this.state.offsets.offsetTop} 
                        />
                    </div>
                    <div className="center" >
                        {
                            //Генерация матрицы
                            this.state.grid.map((valueRow) =>
                                <div key={valueRow.row} data-row={valueRow.row} className="row">
                                    {valueRow.cell.map((valueCol) => 
                                        <Cell 
                                        key={valueCol}
                                        row={valueRow.row}
                                        col={valueCol} 
                                        size = {this.props.cellSize} 
                                        />
                                    )}
                                </div>
                            )
                        }
                    </div>
                    <div className="right">
                        <ButtonPlus
                            action = {this.colAdd}
                            size = {this.props.cellSize} 
                        />
                    </div>
                </div>
                <div className="bottom">
                    <ButtonPlus
                        action = {this.rowAdd}
                        size = {this.props.cellSize}
                     />
                </div>
            </div>
        )
    }
}

export default Table;

