import React, { createContext } from "react";
import firebase from "firebase";

const AuthContext = createContext({});

export default class AuthProvider extends React.Component {
  static Consumer = AuthContext.Consumer;

  loginWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        if (result.user) {
          this.setState({ isLoggedIn: true });
        }
        localStorage.setItem("firebase-user", JSON.stringify(result.user));
      })
      .catch(error => {
        console.log(error);
      });
  };

  logout = async () => {
    try {
      await firebase.auth().signOut();
      localStorage.removeItem("firebase-user");
      this.setState({ isLoggedIn: false });
    } catch (error) {
      console.error(error);
    }
  };

  constructor(props) {
    super(props);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem("firebase-user", JSON.stringify(user));
      } else {
        localStorage.removeItem("firebase-user");
      }
    });
    this.state = { isLoggedIn: !!localStorage.getItem("firebase-user") };
    this.state.loginWithGoogle = this.loginWithGoogle;
    this.state.logout = this.logout;
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
