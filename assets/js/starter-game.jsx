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
      validIndexes: [],
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
        }, 500);
      }
    }
  }

  render() {
    let onSelectFn;
    console.log(this.state.validIndexes);
    return (
      <div className="flex-container">{this.state.cards.map((imageName, i) => {
        if (this.state.validIndexes.find((element) => { return element == i })) {
          return <Card displayed={true} style={{ color: "red" }} cardImageName={imageName} key={i} onSelect={() => { }} />
        }
        if (this.state.viewedA == i) {
          onSelectFn = () => { };
        }
        else {
          onSelectFn = () => { this.clickCard(i) }
        }
        return <Card displayed={this.state.viewedA == i || this.state.viewedB == i} isSelected={this.state.viewedA == i} cardImageName={imageName} key={i} onSelect={onSelectFn} />
      })}</div>
    );
  }
}
