import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './styles/tableStyle.css';
import Cell from './Cell';
import ButtonPlus from './ButtonPlus';
import ButtonMinus from './ButtonMinus';

class Table extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            col: this.props.initialWidth,
            row: this.props.initialHeight,
            size: this.props.cellSize,
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
        const nextRow = this.state.row + 1;

        let currentRowArr = [];
        this.state.rowArr.forEach((item) => {
            currentRowArr.push(item);
        })
        currentRowArr.push(nextRow);

        this.setState({
            row: nextRow,
            rowArr: currentRowArr
        });
    }

    colAdd = (e) => {
        const nextCol = this.state.col + 1;

       let currentColArr = [];
       this.state.colArr.forEach((item) => {
           currentColArr.push(item)
       })
       currentColArr.push(nextCol);

       this.setState({
           col: nextCol,
           colArr: currentColArr,
           position: {col: NaN}
       })
    }

    delRow = (e) => {

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

    componentDidMount() {

        let rowArrs = [];
        let colArrs = [];

        for (let i = 1; i <= this.state.row; i++) {
            rowArrs.push(i);
        }
        for (let i = 1; i <= this.state.col; i++) {
            colArrs.push(i);
        }

        this.setState({
            rowArr: rowArrs,
            colArr: colArrs
        })
    
    }

    tableOver = (e) => {

        const target = e.target;

        if ( target.className === 'squere'
            || target.className === 'row'
            || target.className === 'squere squere-minus') {

                const allSquares = document.getElementsByClassName('squere');
                const inCenterSquares = Array.prototype.filter.call(allSquares, (allSquares) => {
                    return allSquares.className === 'squere';
                });

                console.log(target.dataset.row,target.dataset.col)

                if  (inCenterSquares.includes(target)) {

                    const currentRow = target.parentElement;
                    const currentInnerDiv = target;
                    const matrix = currentRow.parentElement;

                    const currentRowNumber = Array.from(matrix.children).indexOf(currentRow);
                    const currentColNumber = Array.from(currentRow.children).indexOf(currentInnerDiv);


                    this.setState({
                        position: {
                            row: currentRowNumber,
                            col: currentColNumber
                        },
                        visible: {
                            up: true,
                            left: true
                        },
                        offsets: {
                            offsetLeft: 3 + currentColNumber * 52,
                            offsetTop: 3 + currentRowNumber * 52,
                        }
                    })

                }
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
        let hiddenUp = classNames({
            'squere-minus_visible': this.state.visible.up
        })
        let hiddenLeft = classNames({
            'squere-minus_visible': this.state.visible.left
        })


        return (
            <div ref={this.ref} onMouseOver={this.tableOver} onMouseOut={this.tableOut} className="squeres-folder">
                <div className="up">
                    <ButtonMinus className={`squere squere-minus ${hiddenUp}`}
                    action = {this.delCol}
                    size = {this.state.size}
                    positionLeft = {this.state.offsets.offsetLeft} />
                </div>
                <div className="wrapper">
                    <div className="left">
                        <ButtonMinus className={`squere squere-minus ${hiddenLeft}`}
                        action = {this.delRow}
                        size = {this.state.size}
                        positionTop = {this.state.offsets.offsetTop} />
                    </div>
                    <div className="center" >
                        {
                            //Генерация матрицы
                            this.state.rowArr.map((valueRow) => 
                                <div key={valueRow} data-row={valueRow} className="row">
                                    {this.state.colArr.map((valueCol) => 
                                        <Cell 
                                        key={valueCol}
                                        row={valueRow}
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

