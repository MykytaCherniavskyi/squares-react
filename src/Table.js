import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Row from './Row';
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
            colArr: []
        };

        
        this.positions = {
            col: 0,
            row: 0
        };
        this.offsets = {
            offsetLeft: 0,
            offsetTop: 0
        };
        this.nextRow = this.state.row + 1;
        this.nextCol = this.state.col + 1;

        // this.ref = React.createRef();
        this.matrixWrapper = null;
        this.minusTop = null;
        this.minusLeft = null;
        this.matrix = null;
    }

    updateCol = (nextCol) => {
        this.setState({
            col: nextCol
        });

        this.colArr.push(nextCol);

    }

    updateRow = (nextRow) => {
        this.setState({
            row: nextRow
        }, () => {
            // console.log("I'm assinchronic now")
        });
        this.rowArr.push(nextRow);
    }

    createRow = (update) => {

        if  (update == this.updateRow) {
            update(this.nextRow);
            
        }
        if  (update == this.updateCol) {
            update(this.nextCol);
            this.nextCol += 1;
        }
        
    }

    rowAdd = (e) => {        
        let currentRowArr = [];
        this.state.rowArr.forEach((item) => {
            currentRowArr.push(item);
        })
        currentRowArr.push(this.nextRow);

        this.setState({
            row: this.nextRow,
            rowArr: currentRowArr
        }, () => {
            this.nextRow += 1;
        });
    }

    colAdd = (e) => {
        this.createRow(this.updateCol);
    }

    delRow = (e) => {

        this.minusLeft.style.visibility = 'hidden';
        this.minusTop.style.visibility = 'hidden';
        setTimeout(() => {

            /**
             * Убрать данный фрагмент, чтобы удаление было до текущего значения this.position.row
             */
            if (isNaN(this.positions.row) || this.rowArr.length === 1) return false;
            //Удаляем текущий эллемент
            this.rowArr.splice(this.positions.row, 1);

            const rowArrLength = this.rowArr.length;

            this.rowArr = [];

            //Создаем массив нужной длинны после удаления эллемента из массива
            for (let i = 1; i <= rowArrLength; i++) {
                this.rowArr.push(i);
            }

            this.nextRow = this.rowArr.length + 1;

            this.positions.row = NaN;
            this.setState({
                row: this.rowArr.length
            }); 

        },200);

    }

    delCol = (e) => {

        this.minusLeft.style.visibility = 'hidden';
        this.minusTop.style.visibility = 'hidden';
        setTimeout(() => {

            /**
             * Убрать данный фрагмент, чтобы удаление было до текущего значения this.position.col
             */
            if (isNaN(this.positions.col) || this.colArr.length === 1) return false;
            //Удаляем текущий эллемент
            this.colArr.splice(this.positions.col, 1);

            const colArrLength = this.colArr.length;

            this.colArr = [];

            //Создаем массив нужной длинны после удаления эллемента из массива
            for (let i = 1; i <= colArrLength; i++) {
                this.colArr.push(i);
            }

            this.nextCol = this.colArr.length + 1;

            this.positions.col = NaN;
            this.setState({
                col: this.colArr.length
            }); 

        },200);


    }

    componentDidMount() {
        // this.matrixWrapper = this.ref.current;

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
        

        this.minusTop = document.querySelector('.up .squere-minus');
        this.minusLeft = document.querySelector('.left .squere-minus');
        this.matrix = document.querySelector('.center');
    }

    tableOver = (e) => {

        const target = e.target;

        if (target === this.matrix
            || target.className === 'squere'
            || target.className === 'row'
            || target.className === 'squere squere-minus') {

                const rowsCount = this.rowArr.length;
                const cellCount = this.colArr.length;

                if  (rowsCount > 1) this.minusLeft.style.visibility = 'visible';
                else this.minusLeft.style.visibility = 'hidden';
                if  (cellCount > 1) this.minusTop.style.visibility = 'visible';
                else this.minusTop.style.visibility = 'hidden';

                this.offsets.offsetLeft = target.getBoundingClientRect().top - this.matrix.getBoundingClientRect().top;
                this.offsets.offsetTop = target.getBoundingClientRect().left - this.matrix.getBoundingClientRect().left;

                const allSquares = this.matrix.getElementsByClassName('squere');
                const inCenterSquares = Array.prototype.filter.call(allSquares, (allSquares) => {
                    return allSquares.className === 'squere';
                });

                if  (inCenterSquares.includes(target)) {

                    const currentRow = target.parentElement;
                    const currentInnerDiv = target;

                    this.positions.row = Array.from(this.matrix.children).indexOf(currentRow);
                    this.positions.col = Array.from(currentRow.children).indexOf(currentInnerDiv);

                    this.minusTop.style.left = this.offsets.offsetTop + 'px';
                    this.minusLeft.style.top = this.offsets.offsetLeft + 'px';

                }


            } else {
                this.minusLeft.style.visibility = 'hidden';
                this.minusTop.style.visibility = 'hidden';
            }

    }

    tableOut = (e) => {

        const target = e.target;
        

        if (!(target === this.matrix
            || target.className === 'squere'
            || target.className === 'row')) {
            
            this.minusLeft.style.visibility = 'hidden';
            this.minusTop.style.visibility = 'hidden';

        }

    }


    render () {


        return (
            <div ref={this.ref} onMouseOver={this.tableOver} onMouseOut={this.tableOut} className="squeres-folder">
                <div className="up">
                    <ButtonMinus className="squere squere-minus"
                    action = {this.delCol}
                    size = {this.state.size} />
                </div>
                <div className="wrapper">
                    <div className="left">
                        <ButtonMinus className="squere squere-minus"
                        action = {this.delRow}
                        size = {this.state.size} />
                    </div>
                    <div className="center" >
                        {
                            //Генерация матрицы
                            this.state.rowArr.map((valueRow) => 
                                <div key={valueRow} className="row">
                                    {this.state.colArr.map((valueCol) => 
                                        <Cell 
                                        key={valueCol} 
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

