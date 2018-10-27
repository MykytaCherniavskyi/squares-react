import React from 'react';
import ReactDOM from 'react-dom';
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
            size: this.props.cellSize
        };
        
        this.positions = {
            col: 0,
            row: 0
        };
        this.nextRow = this.state.row + 1;
        this.nextCol = this.state.col + 1;
        this.rowArr = [];
        this.colArr = [];


        for (let i = 1; i <= this.state.row; i++) {
            this.rowArr.push(i);
        }
        for (let i = 1; i <= this.state.col; i++) {
            this.colArr.push(i);
        }

        this.updateCol = this.updateCol.bind(this);
        this.updateRow = this.updateRow.bind(this);
        this.tableOver = this.tableOver.bind(this);
        this.rowAdd = this.rowAdd.bind(this);
        this.colAdd = this.colAdd.bind(this);
        this.delCol = this.delCol.bind(this);
        this.delRow = this.delRow.bind(this);

        this.ref = React.createRef();
        this.elem = null;
    }

    updateCol(nextCol) {
        this.setState({
            col: nextCol
        });

        this.colArr.push(nextCol);

    }

    updateRow(nextRow) {
        this.setState({
            row: nextRow
        });

        this.rowArr.push(nextRow);
    }

    createRow(update) {

        if  (update == this.updateRow) {
            update(this.nextRow);
            this.nextRow += 1;
        }
        if  (update == this.updateCol) {
            update(this.nextCol);
            this.nextCol += 1;
        }
        

        const renderItems =  this.rowArr.map((valueRow) => 
            <div key={valueRow} className="row">
                {this.colArr.map((valueCol) => 
                    <Cell key={valueCol} row={valueRow} col={valueCol} className="squere"/>
                )}
            </div>
        );

        return (
            renderItems
        )

    }

    delRow(e) {

        /**
         * Убрать данный фрагмент, чтобы удаление было до текущего значения this.position.row
         */
        if (isNaN(this.positions.row)) return false;
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
    }

    delCol(e) {

        /**
         * Убрать данный фрагмент, чтобы удаление было до текущего значения this.position.col
         */
        if (isNaN(this.positions.col)) return false;
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
    }

    tableOver(e) {

        const target = e.target;

        const matrixWrapper = this.ref.current;

        const allSquares = matrixWrapper.getElementsByClassName('squere');
        const inCenterSquares = Array.prototype.filter.call(allSquares, (allSquares) => {
            return allSquares.className === 'squere';
        });

        if  (inCenterSquares.includes(target)) {

            const currentRow = target.parentElement;
            const currentInnerDiv = target;

            this.positions.row = Array.from(matrixWrapper.children).indexOf(currentRow);
            this.positions.col = Array.from(currentRow.children).indexOf(currentInnerDiv);


        }

        //console.log(this.positions);

    }

    rowAdd(e) {        
        this.createRow(this.updateRow);
    }

    colAdd(e) {
        this.createRow(this.updateCol);
    }



    render () {


        return (
            <div className="squeres-folder">
                <div className="up">
                    <ButtonMinus className="squere squere-minus"
                    action = {this.delCol} />
                </div>
                <div className="wrapper">
                    <div className="left">
                        <ButtonMinus className="squere squere-minus"
                        action = {this.delRow} />
                    </div>
                    <div ref={this.ref} className="center" onMouseOver={this.tableOver}>
                        {this.createRow()}
                    </div>
                    <div className="right">
                        <ButtonPlus className="squere squere-plus" 
                        action = {this.colAdd} />
                    </div>
                </div>
                <div className="bottom">
                    <ButtonPlus className="squere squere-plus" 
                    action = {this.rowAdd} />
                </div>
            </div>
        )
    }
}

export default Table;

