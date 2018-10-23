import React from 'react';
import ReactDOM from 'react-dom';
import Row from './Row';
import Cell from './Cell';

class Table extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            col: this.props.initialWidth,
            row: this.props.initialHeight,
            size: this.props.cellSize
        };
        this.updateCol = this.updateCol.bind(this);
        this.updateRow = this.updateRow.bind(this);
        this.tableOver = this.tableOver.bind(this);
    }

    updateCol(e, ...numbers) {
        const target = e.target;

        console.log(numbers);

        let [row, col] = numbers;

        this.setState({
            col: col
        });

    }

    updateRow(e, ...numbers) {
        const target = e.target;

        console.log(numbers);

        let [row, col] = numbers;

        this.setState({
            row: row
        });
    }

    createRow(row,col) {
        let items = [];

        for (let i = 0; i < row; i++) {
            items.push(
                <Row
                    className="row"
                    col = {col}
                    row = {row}
                />
            )
        }

        return (
            items
        )
    }

    tableOver(e) {

        const target = e.target;

        console.log(target);

        /*if (target === this.matrix
            || target.className === 'squere'
            || target.className === 'row'
            || target.className === 'squere squere-minus') {

            const rowsCount = this.rows.length;
            const cellCount = this.rows[0].childElementCount;

            if  (rowsCount > 1) this.minusLeft.style.visibility = 'visible';
            else this.minusLeft.style.visibility = 'hidden';
            if  (cellCount > 1) this.minusTop.style.visibility = 'visible';
            else this.minusTop.style.visibility = 'hidden';

            this.offsets.offsetLeft = target.getBoundingClientRect().top - this.matrix.getBoundingClientRect().top;
            this.offsets.offsetTop = target.getBoundingClientRect().left - this.matrix.getBoundingClientRect().left;

            //Фильтрация чисто элементов центральной таблицы (контролы удалены)
            const allSquares = this.matrixWrapper.getElementsByClassName('squere');
            const inCenterSquares = Array.prototype.filter.call(allSquares, function(allSquares){
                return allSquares.className === 'squere';
            });

            // Проверяю, что фокус именно на эллементе таблицы
            if  (inCenterSquares.includes(target)) {

                const currentRow = target.parentElement;
                const currentInnerDiv = target;

                this.positions.row = Array.from(this.matrix.children).indexOf(currentRow);
                this.positions.div = Array.from(currentRow.children).indexOf(currentInnerDiv);

                this.minusTop.style.left = this.offsets.offsetTop + 'px';
                this.minusLeft.style.top = this.offsets.offsetLeft + 'px';

            }

        } else {
            this.minusLeft.style.visibility = 'hidden';
            this.minusTop.style.visibility = 'hidden';
        }*/

    }

    render () {


        return (
            <div className="squeres-folder">
                <div className="up">
                    <Cell className="squere squere-minus"
                          id = "del-col"
                          col = {this.state.col}
                          row = {this.state.row}
                    />
                </div>
                <div className="wrapper">
                    <div className="left">
                        <Cell className="squere squere-minus"
                              id = "del-row"
                              col = {this.state.col}
                              row = {this.state.row}
                        />
                    </div>
                    <div className="center" onMouseOver={this.tableOver}>
                        {this.createRow(this.state.row,this.state.col)}
                    </div>
                    <div className="right">
                        <Cell className="squere squere-plus"
                              id = "add-col"
                             colChange={this.updateCol}
                             col = {this.state.col}
                             row = {this.state.row}
                        />
                    </div>
                </div>
                <div className="bottom">
                    <Cell className="squere squere-plus"
                          id = "add-row"
                         rowChange={this.updateRow}
                         col = {this.state.col}
                         row = {this.state.row}
                    />
                </div>
            </div>
        )
    }
}

export default Table;

