import React from 'react';

export default class Cell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            row: this.props.row,
            col: this.props.col,
            id: this.props.id,
            className: this.props.className
        };

        this.rowAdd = this.rowAdd.bind(this);
        this.colAdd = this.colAdd.bind(this);
    }


    rowAdd(e) {
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
    }

    componentWillUnmount() {

    }

    render() {

        let item;

        switch(this.state.id) {
            case "del-col":
                item = <div className={this.state.className}></div>
                break;
            case "del-row":
                item = <div className={this.state.className}></div>
                break;
            case "add-row":
                item = <div className={this.state.className} onClick={this.rowAdd}></div>
                break;
            case "add-col":
                item = <div className={this.state.className} onClick={this.colAdd}></div>
                break;
            default:
                item = <div className={this.state.className}></div>
        }

        return (
            item
        )
    }

}