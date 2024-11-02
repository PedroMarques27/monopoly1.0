import "./App.css";
import { Component } from "react";
import $ from "jquery";
import { locationInfo } from "./data/locationInfo.js";
import Map from "./Components/Map.js";
import Panel from "./Components/Panel.js";

const locationArr = locationInfo;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: [10000, 10000], // Starting balance for 2 players
      position: [0, 0], // Current positions of players
      turn: 0, // Tracks the current player's turn (0 or 1)
      event: null, // Current event (buy or other)
    };
  }

  async goBtnClick() {
    $("#tip, #goButton").hide();
    const point = this.roll();
    await this.updatePosition(point);
    await this.triggerEvent();
  }

  roll() {
    return Math.floor(Math.random() * 6 + 1);
  }

  async updatePosition(point) {
    const { turn, position } = this.state;
    let currentPosition = position[turn];

    for (let i = 0; i < point; i++) {
      currentPosition = (currentPosition + 1) % 40; // Circular movement
      await this.move(currentPosition);
      await this.sleep(500);
    }

    this.setState((prevState) => {
      const newPosition = [...prevState.position];
      newPosition[turn] = currentPosition;
      return { position: newPosition };
    });
  }

  move(destination) {
    $("#location" + destination).append($("#player" + (this.state.turn + 1)));
  }

  async triggerEvent() {
    const player = this.state.turn;
    const position = this.state.position[player];
    const location = locationArr[position];

    if ([0, 10, 20, 30].includes(position)) {
      this.judgeStatus();
    } else if (location.owner === -1) {
      this.setState({ event: this.buyEvent }, () => {
        $("#message").html(`Do you want to buy this location? [Cost €${location.price}]`);
        $("#messageBox").show();
      });
    } else if (location.owner === player) {
      this.judgeStatus();
    } else {
      await this.handleFine(location, player);
    }
  }

  async handleFine(location, player) {
    const fine = location.fine;
    $("#message").html(`Pay [€${fine}] for passing through.`);
    $(".messageBoxBtn").hide();
    $("#messageBox").show();

    this.setState((prevState) => {
      const newBalance = [...prevState.balance];
      newBalance[player] -= fine;
      newBalance[location.owner] += fine;
      return { balance: newBalance };
    });

    await this.sleep(3000);
    $("#messageBox").hide();
    this.judgeStatus();
  }

  judgeStatus() {
    this.updateTurn();
    $(".messageBoxBtn").show();
    $(".dice").hide();
    $("#tip, #goButton").show();
  }

  updateTurn() {
    this.setState((prevState) => ({
      turn: (prevState.turn + 1) % 2,
    }));
  }

  noBtnClick() {
    $("#messageBox").hide();
    this.judgeStatus();
  }

  buyEvent = () => {
    const player = this.state.turn;
    const position = this.state.position[player];
    const location = locationArr[position];

    location.owner = player;
    this.setState((prevState) => {
      const newBalance = [...prevState.balance];
      newBalance[player] -= location.price;
      return { balance: newBalance };
    });

    $("#messageBox").hide();
    this.judgeStatus();
  };

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  render() {
    return (
      <div className="App">
        <header id="background" className="App-header">
          <Map
            goBtnClick={this.goBtnClick.bind(this)}
            turn={this.state.turn}
            noBtnClick={this.noBtnClick.bind(this)}
            yesBtnClick={this.state.event}
          />
          <Panel balance={this.state.balance} />
        </header>
      </div>
    );
  }
}

export default App;
