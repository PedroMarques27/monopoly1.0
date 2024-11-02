
import { Component } from "react";
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
export default Panel;  