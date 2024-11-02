
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
import { Component } from "react";

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

export default Map;  