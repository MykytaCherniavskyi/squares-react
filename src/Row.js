import React from 'react';
import Cell from './Cell';

export default class Row extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            row: this.props.row,
            col: this.props.col
        };
        this.className = props.className;
        this.classNameArray = this.className.split(' ');

        this.createCol = this.createCol.bind(this);
    }

    componentWillUnmount() {

    }

    createCol(row,col) {
        let items = [];

        for (let i = 0; i < col; i++) {
            items.push(
                <Cell className="squere"
                      row={row}
                      col={col}
                />
            )
        }

        return (
            items
        )
    }


    render() {

        return (
            <div className={this.className}>
                {this.createCol(this.props.row,this.props.col)}
            </div>
        )
    }


}