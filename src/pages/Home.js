import React from "react";
import AuthProvider from "../context/AuthProvider";

export default class Home extends React.Component {
  render() {
    return (
      <AuthProvider.Consumer>
        {({ logout }) => {
          return (
            <div
              className="blue"
              style={{
                backgroundColor: ""
              }}
            >
              <div>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          );
        }}
      </AuthProvider.Consumer>
    );
  }
}
