import React from 'react';

export default class ButtonMinus extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            className: this.props.className,
            action: this.props.action
        };
    }

    render() {

        return (
            <div className={this.state.className} onClick={this.state.action}/>
        )
    }

}