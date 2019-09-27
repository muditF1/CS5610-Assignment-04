import React, { Component } from 'react'
class Card extends Component {
    onClickHandler() {
        this.props.onSelect();
    }

    render() {
        if (this.props.displayed) {
            return (
                <div><p><button style={this.props.style} onClick={this.onClickHandler.bind(this)}>{this.props.cardName}</button></p></div>
            );
        }
        else {
            return (<div><p><button style={this.props.style} onClick={this.onClickHandler.bind(this)}>Click Me!</button></p></div>);
        }
    }
}

export default Card