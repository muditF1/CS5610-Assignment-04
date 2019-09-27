import React, { Component } from 'react'
class Card extends Component {
    onClickHandler() {
        this.props.onSelect();
    }

    render() {
        if (this.props.displayed) {
            return (
                <div style={this.props.style} onClick={this.onClickHandler.bind(this)}>{this.props.cardImageName}</div>
            );
        }
        else {
            return (<div style={this.props.style} onClick={this.onClickHandler.bind(this)}>Click Me!</div>);
        }
    }
}

export default Card