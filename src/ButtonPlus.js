import React from 'react';

export default class ButtonPlus extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            className: this.props.className,
            size: this.props.size,
            action: this.props.action
        };

        this.size = {
            width: this.state.size + "px",
            height: this.state.size + "px"
        }
    }

    render() {

        return (
            <div className={this.state.className} style={this.size} onClick={this.state.action}/>
        )
    }

}