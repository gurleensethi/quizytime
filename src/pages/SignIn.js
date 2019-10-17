import React from "react";
import AuthProvider from "../context/AuthProvider";

export default class SignIn extends React.Component {
  render() {
    return (
      <AuthProvider.Consumer>
        {({ loginWithGoogle }) => (
          <div
            className="orange white-text center"
            style={{
              margin: "auto auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20%"
            }}
          >
            <div
              className="center"
              style={{
                fontSize: "32px",
                padding: "40px"
              }}
            >
              <i
                className="material-icons"
                style={{
                  fontSize: "120px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                subject
              </i>
              QuizyTime
            </div>
            <div
              style={{
                fontSize: "24px"
              }}
            >
              SignIn
            </div>
            <button
              className="btn"
              style={{
                marginTop: "40px",
                maxWidth: "200px"
              }}
              onClick={loginWithGoogle}
            >
              Signin with Google
            </button>
          </div>
        )}
      </AuthProvider.Consumer>
    );
  }
}
