import React from "react";
import { Link } from "react-router-dom";

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="red center white-text">
        <div
          style={{
            fontSize: 20
          }}
        >
          404 Page Not Found :(
        </div>
        <div
          style={{
            fontSize: 20,
            paddingTop: 20
          }}
        >
          <Link to="/">
            <button className="btn">Let's go back Home</button>
          </Link>
        </div>
      </div>
    );
  }
}
