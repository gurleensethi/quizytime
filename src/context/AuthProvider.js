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

  componentDidMount() {
    this.unsubscribeAuthChanged = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(prevState => {
          return { userId: user.uid };
        });
        localStorage.setItem("firebase-user", JSON.stringify(user));
      } else {
        localStorage.removeItem("firebase-user");
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeAuthChanged();
  }

  constructor(props) {
    super(props);
    let storedFirebaseUser = localStorage.getItem("firebase-user");
    if (storedFirebaseUser) {
      storedFirebaseUser = JSON.parse(storedFirebaseUser);
    }
    this.state = {
      isLoggedIn: !!storedFirebaseUser,
      userId: storedFirebaseUser ? storedFirebaseUser.uid : undefined
    };
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
