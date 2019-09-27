import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './Card'
import _ from 'lodash';
import '../css/app.css'

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

// Declaring the Array of cars
const cardValues = ["A", "B", "C", "D", "E", "F", "G",
  "H", "A", "B", "C", "D", "E", "F", "G", "H"];

// Shuffle the cards
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

class Starter extends Component {
  constructor(props) {
    super(props);
    // initializing the state of the elements at load
    this.state = {
      cards: shuffle(cardValues),
      viewedA: null,
      viewedB: null,
      validIndexes: []
    }
    this.clickCard = this.clickCard.bind(this)
  }

  clickCard(index) {
    let { viewedA, viewedB, cards, validIndexes } = this.state;
    if (viewedA == null) {
      this.setState({ viewedA: index })
    }
    else {
      if (cards[viewedA] === cards[index]) {
        this.setState({ validIndexes: validIndexes.concat([viewedA, index]) })
      }
      else {
        this.setState({ viewedB: index })
        setTimeout(() => {
          this.setState({ viewedA: null, viewedB: null })
        }, 1000);
      }
    }
  }

  resetGame () {
    this.setState({
      cards: shuffle(cardValues),
      viewedA: null,
      viewedB: null,
      validIndexes: []
    });
  };

  render() {
    let onSelectFn;
    let button = <div className="column">
      <p><button onClick={this.resetGame.bind(this)}>Reset Game</button></p>
    </div>;

    let gameDescription = <div>
      <p>Memory game where you need to match pairs of tiles. Playing is very simple - you turn over one tile and then try to find a matching tile.</p>
    </div>;

    return (
      <div>
        {gameDescription}
        {button}
        <div className="column flex-container">{this.state.cards.map((name, index) => {
          if (this.state.validIndexes.find((element) => { return element == index })) {
            return <Card displayed={true} style={{ visibility:"hidden" }} cardName={name} key={index} onSelect={() => { }} />
          }
          if (this.state.viewedA == index) {
            onSelectFn = () => { };
          }
          else {
            onSelectFn = () => { this.clickCard(index) }
          }
          return <Card displayed={this.state.viewedA == index || this.state.viewedB == index} isSelected={this.state.viewedA == index} cardName={name} key={index} onSelect={onSelectFn} />
        })}</div>
      </div>
    );
  }
}
