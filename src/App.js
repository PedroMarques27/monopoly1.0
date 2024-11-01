import "./App.css";
import { Component } from "react";
import React from "react";
import $ from "jquery";
import map from "./img/map.png";
import player1 from "./img/player1.png";
import player2 from "./img/player2.png";
import logo from "./img/logo.png";
import goButton from "./img/goButton.png";
import dice0 from "./img/dice0.gif";
import dice1 from "./img/dice1.png";
import dice2 from "./img/dice2.png";
import dice3 from "./img/dice3.png";
import dice4 from "./img/dice4.png";
import dice5 from "./img/dice5.png";
import dice6 from "./img/dice6.png";
import yesBtn from "./img/yesBtn.png";
import noBtn from "./img/noBtn.png";
import flag1 from "./img/flag1.png";
import flag2 from "./img/flag2.png";
import { locationInfo } from "./data/locationInfo.js";

const locationArr = locationInfo;

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: [10000, 10000],
      position: [0, 0],
      direction: [true, true],
      restriction: [0, 0],
      turn: 0,
      event: null
    };
    this.buyEvent = this.buyEvent.bind(this);
  }

  async goBtnClick() {
    //动态效果
    $("#tip").hide();
    $("#goButton").hide();
    let dice0 = $("#dice0");
    dice0.show();
    await sleep(1000);
    dice0.hide();
    let point = this.roll();
    $("#dice" + point).show();
    await this.updatePosition(point);
    await sleep(500);
    await this.triggerEvent();
  }

  roll() {
    return Math.floor(Math.random() * 6 + 1);
    // return 4;
  }

  async updatePosition(point) {
    let currentPosition = this.state.position[this.state.turn];
    if (this.state.direction[this.state.turn]) {
      for (let i = 0; i < point; i++) {
        currentPosition++;
        if (currentPosition > 39) {
          currentPosition = 0;
        }
        await sleep(500);
        this.move(currentPosition);
      }
    } else {
      for (let i = 0; i < point; i++) {
        currentPosition--;
        if (currentPosition < 0) {
          currentPosition = 39;
        }
        await sleep(500);
        this.move(currentPosition);
      }
    }
    let newPosition = this.state.position;
    newPosition[this.state.turn] = currentPosition;
    this.setState({ position: newPosition });
  }

  move(destination) {
    $("#location" + destination).append($("#player" + (this.state.turn + 1)));
  }

  judgeStatus() {
    //判断游戏是否结束
    //.............

    this.updateTurn();
    $(".messageBoxBtn").show();
    $(".dice").hide();
    $("#tip").show();
    $("#goButton").show();
  }

  updateTurn() {
    let newTurn = this.state.turn + 1;
    if (newTurn > 1) {
      newTurn = 0;
    }
    this.setState({ turn: newTurn });
  }

  async triggerEvent() {
    //判断当前格子以及需要触发的事件
    let player = this.state.turn;
    let position = this.state.position[player];
    switch (position) {
      case 0:
        //暂时
        this.judgeStatus();
        break;
      case 10:
        //暂时
        this.judgeStatus();
        break;
      case 20:
        //暂时
        this.judgeStatus();
        break;
      case 30:
        //暂时
        this.judgeStatus();
        break;
      default:
        if (locationArr[position].owner === -1) {
          //可以buy
          $("#message").html(
            "Do you want but this location? [Cost €" +
              locationArr[position].price +
              "]"
          );
          $("#messageBox").show();
          this.setState({ event: this.buyEvent });
        } else if (locationArr[position].owner === player) {
          //暂时无事发生
          this.judgeStatus();
        } else {
          //过路费
          $("#message").html(
            "路过别人地皮，缴纳[€" + locationArr[position].fine + "](不会翻译)"
          );
          $(".messageBoxBtn").hide();
          $("#messageBox").show();
          let newBalance = this.state.balance;
          newBalance[player] -= locationArr[position].fine;
          newBalance[locationArr[position].owner] += locationArr[position].fine;
          await sleep(3000);
          this.setState({ balance: newBalance });
          $("#messageBox").hide();
          this.judgeStatus();
        }
    }
  }

  noBtnClick() {
    $("#messageBox").hide();
    this.judgeStatus();
  }

  buyEvent() {
    let player = this.state.turn;
    let position = this.state.position[player];
    locationArr[position].owner = player;
    let newBalance = this.state.balance;
    newBalance[player] -= locationArr[position].price;
    this.setState({ balance: newBalance });
    $("#messageBox").hide();
    this.judgeStatus();
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

class Map extends Component {
  render() {
    const goBtnClick = this.props.goBtnClick;
    const turn = this.props.turn;
    const noBtnClick = this.props.noBtnClick;
    let yesBtnClick = this.props.yesBtnClick;
    return (
      <div id="mapContainer">
        <img id="map" src={map} alt="" />
        <div id="logoContainer">
          <img id="logo" src={logo} alt="" />
        </div>
        <div id="diceContainer">
          <img id="goButton" src={goButton} alt="" onClick={goBtnClick} />
          <p id="tip">player{turn + 1}'s turn</p>
          <img id="dice0" className="dice" src={dice0} alt="" />
          <img id="dice1" className="dice" src={dice1} alt="" />
          <img id="dice2" className="dice" src={dice2} alt="" />
          <img id="dice3" className="dice" src={dice3} alt="" />
          <img id="dice4" className="dice" src={dice4} alt="" />
          <img id="dice5" className="dice" src={dice5} alt="" />
          <img id="dice6" className="dice" src={dice6} alt="" />
        </div>
        <div id="messageBox">
          <p id="message" />
          <img
            id="yesBtn"
            className="messageBoxBtn"
            src={yesBtn}
            alt=""
            onClick={yesBtnClick}
          />
          <img
            id="noBtn"
            className="messageBoxBtn"
            src={noBtn}
            alt=""
            onClick={noBtnClick}
          />
        </div>
        <div id="location0">
          <img id="player1" className="player" src={player1} alt="" />
          <img id="player2" className="player" src={player2} alt="" />
        </div>
        {locationArr.map(
          (s) =>
            s.location !== 0 && (
              <div id={"location" + s.location} key={s.location}>
                {s.owner === 0 && s.location > 0 && s.location < 10 && (
                  <img
                    id={"flag" + s.location}
                    src={flag1}
                    className="flagBottom"
                    alt=""
                  />
                )}
                {s.owner === 0 && s.location > 10 && s.location < 20 && (
                  <img
                    id={"flag" + s.location}
                    src={flag1}
                    className="flagLeft"
                    alt=""
                  />
                )}
                {s.owner === 0 && s.location > 20 && s.location < 30 && (
                  <img
                    id={"flag" + s.location}
                    src={flag1}
                    className="flagTop"
                    alt=""
                  />
                )}
                {s.owner === 0 && s.location > 30 && s.location < 40 && (
                  <img
                    id={"flag" + s.location}
                    src={flag1}
                    className="flagRight"
                    alt=""
                  />
                )}
                {s.owner === 1 && s.location > 0 && s.location < 10 && (
                  <img
                    id={"flag" + s.location}
                    src={flag2}
                    className="flagBottom"
                    alt=""
                  />
                )}
                {s.owner === 1 && s.location > 10 && s.location < 20 && (
                  <img
                    id={"flag" + s.location}
                    src={flag2}
                    className="flagLeft"
                    alt=""
                  />
                )}
                {s.owner === 1 && s.location > 20 && s.location < 30 && (
                  <img
                    id={"flag" + s.location}
                    src={flag2}
                    className="flagTop"
                    alt=""
                  />
                )}
                {s.owner === 1 && s.location > 30 && s.location < 40 && (
                  <img
                    id={"flag" + s.location}
                    src={flag2}
                    className="flagRight"
                    alt=""
                  />
                )}
              </div>
            )
        )}
      </div>
    );
  }
}

class Panel extends Component {
  render() {
    const balance = this.props.balance;
    return (
      <div id="panel">
        <div className="infoBoard">
          <div className="info">
            <p className="text">Player1(rabbit)</p>
          </div>
          <div className="info">
            <p className="text">€{balance[0]}</p>
          </div>
        </div>
        <div className="infoBoard">
          <div className="info">
            <p className="text">Player2(fox)</p>
          </div>
          <div className="info">
            <p className="text">€{balance[1]}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
