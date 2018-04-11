import React, {Component} from 'react';
import playingCards from './playing-cards.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <Game />
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      selectIndex: -1
    }
  }
  getCard(i) {
    const ranks = [2,3,4,5,6,7,8,9,10,'J', 'Q', 'K', 'A'];
    const suits = ["spade", "clubs", "diamond", "heart"];
    return {rank: ranks[Math.floor(i / 4)], suit: suits[i % 4], isSelected: false};
  }
  swap() {
    var tt = this.state.cards;
    var t = tt[0][0];
    tt[0][0] = tt[0][1];
    tt[0][1] = t;
    this.setState(
      {
        tt
      }
    )
  }
  handleClick(id) {
    // alert('onClick ' + id);
    if (this.state.selectIndex != -1) {
      // alert(this.state.selectIndex);
      var cards = this.state.cards;
      var selectedIdex = this.state.selectIndex;
      
      var t = cards[selectedIdex];
      cards[selectedIdex] = cards[id];
      cards[id] = t;

      // set selected attribute of selectIndex card to false
      cards[id].isSelected = false;

      this.setState({
        cards: cards,
        selectIndex: -1
      });
    } else {
      // alert('Set slected index to ' + id);
      this.state.cards[id].isSelected = true;
      this.state.selectIndex = id;
      this.forceUpdate();
      /*this.setState({
         cards: cardsUpdate,
         selectIndex: id
      })*/
    }
  }
  update() {
    var cardHolders = [];
    var cards = [];
    var minimum = 0, maximum = 51;

    for (var i = 0; i < 52; i++) {
      cardHolders[i] = false;
    }
    for (var i = 0; i < 52; i++) {
      var rand = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      while (cardHolders[rand]) {
        rand = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      }
      cardHolders[rand] = true;
      cards[i] = this.getCard(rand);
    }

    this.setState(
      {
        cards : cards
      }
    )
  }
  render() {
    return (
      <div style={{background: 'green'}}>
        <div>
          <button onClick={() => {this.update();}}>Start</button>
          <button onClick={() => {this.swap();}}>Swap</button>
        </div>
        {this.state.cards.map((o, i) => <Card id={i} onClick={() => {this.handleClick(i)}} styleName={Card1} rank={o.rank} suit={o.suit} isSelected={o.isSelected}/>)}
      </div>
    )
  }
}



class Card extends Component {

  constructor(props) {
    super(props);
  }

  /**
   *  transform: scale(1.1);
   transition: transform ease 0.25s;
   * @returns {*}
   */
  render() {
    var imgSrc = require('./png/' + this.props.rank + "_" + this.props.suit + ".png");
    if (this.props.isSelected) {
      return (
        <span id={this.props.id} style={{
          marginLeft: '5px',
          marginRight: '5px'
        }}>
          <img src={imgSrc} alt={""} style={{
            height: 'auto',
            width: 'auto',
            maxWidth: '80px',
            maxHeight: '120px',
            border: 'solid 1px red',
            backgroundColor: 'white',
            transform: 'scale(1.25, 1.25)',
            transition: 'transform ease 0.25s'}}
            onClick={() => this.props.onClick(this.props.id)}
          />
        </span>
      );
    }
    return (
      <span id={this.props.id} style={{marginLeft: '5px', marginRight: '5px'}}>
        <img src={imgSrc} alt={""} style={{
          height: 'auto',
          width: 'auto',
          maxWidth: '80px',
          maxHeight: '120px',
          border: 'solid 1px red',
          backgroundColor: 'white'}}
          onClick={() => this.props.onClick(this.props.id)}
        />
      </span>
    );
  }
}

/**
 * top right bottom left
 * 0 100 200 300
 * 75 150 225
 *
 * (0 75 100 0), (0 150, 100, 75), (0, 225, 100, 150)
 * (100 75 200 0), (100 150, 200, 75), (100, 225, 200, 150)
 * (200 75 300 0), (200 150, 300, 75), (200, 225, 300, 150)
 * (300 75 400 0), (300 150, 400, 75), (300, 225, 400, 150)
 */
class Card1 extends Component {

  constructor(props) {
    super(props);
    this.width = 952;
    this.height = 396;
    this.ranks = ["A", "K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2];
    this.suits = ["clubs", "heart", "spade", "diamond"];
    for (var i = 0; i < this.ranks.length; i++) {
      for (var j = 0; j < this.suits.length; j++) {
        console.log(this.ranks[i] + "_" + this.suits[j]);
      }
    }
    this.arr = [];
    for (var j = 0; j < 4; j++) {
      this.arr[this.suits[j]] = [];
      for (var i = 0; i < 13; i++) {
        this.arr[this.suits[j]][[this.ranks[i]]] = [this.height / 4 * j, this.width / 13 * (i + 1), this.height / 4 * (j + 1), this.width / 13 * i];
      }
    }
    console.log(this.arr);
    console.log(this.arr['spade']['A']);
    console.log(this.width / 13, this.height / 4);
  }

  render() {

    var arr = this.arr[this.props.suit][this.props.rank];
    var clipStr = "rect(" + arr[0] + "px," + arr[1] + "px," + arr[2] + "px," + arr[3] + "px)";
    console.log(clipStr);
    return (
      <div>
        <img style={{position: "absolute", clip: clipStr}} src={playingCards} alt={""} className="home"/>
      </div>
    );
  }
}

export default App;
