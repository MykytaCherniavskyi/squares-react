import React from 'react';
import classNames from 'classnames';
import './styles/tableStyle.css';
import Cell from './Cell';
import ButtonPlus from './ButtonPlus';
import ButtonMinus from './ButtonMinus';

function grid(row,col) {

    let colArrs = [];
    const tableGrid = [];

    for (let i = 0; i <= col - 1; i++) {
        colArrs.push(i);
    }

    for (let r = 0; r <= row - 1; r++) {
        tableGrid[r] = {row: r, cell: colArrs };
    }


    return tableGrid
}

class Table extends React.Component{

    constructor(props) {
        super(props);
        let tableGrid = grid(this.props.initialHeight,this.props.initialWidth);
        console.log(tableGrid)
        this.state = {
            col: this.props.initialWidth - 1,
            row: this.props.initialHeight - 1,
            size: this.props.cellSize,
            grid: tableGrid,
            rowArr: [],
            colArr: [],
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

        let newGrid = this.state.grid;
        let lastRow = newGrid[newGrid.length - 1];
        let newRow = Object.assign({},lastRow);
        newRow.row += 1 ;
        newGrid.push(newRow)

        this.setState({
            grid: newGrid
        });
    }

    colAdd = (e) => {

        let newGrid = this.state.grid;
        const newCell = newGrid[newGrid.length - 1].cell.length;
        newGrid[0].cell.push(newCell)

        this.setState({
            grid: newGrid
        })
    }

    delRow = (e) => {

        TODO: 
        // Использовать Array.filter для удаления эллемента. Оставить все значения кроме того, который в фокусе
        this.setState({
            visible: {
                up: false,
                left: false
            }
        });


        setTimeout(() => {

            /**
             * Убрать данный фрагмент, чтобы удаление было до текущего значения this.position.row
             */
            if (isNaN(this.state.position.row) || this.state.rowArr.length === 1) return false;

            let currentRowArr = [];
            this.state.rowArr.forEach((item) => {
                currentRowArr.push(item)
            })

            const ePosition = this.state.position.row;

            currentRowArr.splice(ePosition, 1);

            const rowArrLength = currentRowArr.length;

            let newRowArr = []

            for (let i = 1; i <= rowArrLength; i++) {
                newRowArr.push(i);
            }


            this.setState({
                row: currentRowArr.length,
                rowArr: newRowArr,
                position: {row: NaN}
            })

        },200);

    }

    delCol = (e) => {

        this.setState({
            visible: {
                up: false,
                left: false
            }
        });

        setTimeout(() => {

            /**
             * Убрать данный фрагмент, чтобы удаление было до текущего значения this.position.row
             */
            if (isNaN(this.state.position.col) || this.state.colArr.length === 1) return false;

            let currentColArr = [];
            this.state.colArr.forEach((item) => {
                currentColArr.push(item)
            })

            const ePosition = this.state.position.col;

            currentColArr.splice(ePosition, 1);

            const colArrLength = currentColArr.length;

            let newColArr = []

            for (let i = 1; i <= colArrLength; i++) {
                newColArr.push(i);
            }

            this.setState({
                col: currentColArr.length,
                colArr: newColArr,
                position: {col: NaN},
                visible: {
                    up: false,
                    left: false
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
                        up: true,
                        left: true
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
                    <ButtonMinus className={classNames('squere','squere-minus', {'squere-minus_visible': this.state.visible.up})}
                    action = {this.delCol}
                    size = {this.state.size}
                    positionLeft = {this.state.offsets.offsetLeft} />
                </div>
                <div className="wrapper">
                    <div className="left">
                        <ButtonMinus className={classNames('squere','squere-minus', {'squere-minus_visible': this.state.visible.left})}
                        action = {this.delRow}
                        size = {this.state.size}
                        positionTop = {this.state.offsets.offsetTop} />
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
                                        size = {this.state.size} 
                                        className="squere" 
                                        />
                                    )}
                                </div>
                            )
                        }
                    </div>
                    <div className="right">
                        <ButtonPlus className="squere squere-plus" 
                        action = {this.colAdd}
                        size = {this.state.size} />
                    </div>
                </div>
                <div className="bottom">
                    <ButtonPlus className="squere squere-plus" 
                    action = {this.rowAdd}
                    size = {this.state.size} />
                </div>
            </div>
        )
    }
}

export default Table;

