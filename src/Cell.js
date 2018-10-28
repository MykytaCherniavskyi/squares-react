import React from 'react';

export default class Cell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            row: this.props.row,
            col: this.props.col,
            id: this.props.id,
            size: this.props.size,
            className: this.props.className
        };
        this.size = {
            width: this.state.size + "px",
            height: this.state.size + "px"
        }

/*         this.rowAdd = this.rowAdd.bind(this);
        this.colAdd = this.colAdd.bind(this); */
    }


/*     rowAdd(e) {
        this.setState({
            row: ++this.state.row
        });
        this.props.rowChange(e,this.state.row,this.state.col);
    }
    colAdd(e) {
        this.setState({
            col: ++this.state.col
        });
        this.props.colChange(e,this.state.row,this.state.col);
    } */

    componentWillUnmount() {

    }

    render() {

        return (
            <div className={this.state.className} style={this.size}></div>
        )
    }

}