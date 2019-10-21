import React, { createContext } from "react";
import AuthProvider from "./AuthProvider";
import FirebaseMetaData from "../constants/firebase-meta-data";
import firebase from "firebase";

const QuizListContext = createContext({});

class QuizListProvider extends React.Component {
  static Consumer = QuizListContext.Consumer;

  state = {
    userQuizes: []
  };

  componentDidMount() {
    this.fetchQuizes();
  }

  fetchQuizes = async () => {
    const { userId } = this.props;
    if (!userId) return;
    const docPath = `${FirebaseMetaData.Collections.USER.name}/${userId}`;
    const quizes = await firebase
      .firestore()
      .doc(docPath)
      .get();
  };

  render() {
    return (
      <QuizListContext.Provider value={this.state}>
        {this.props.children}
      </QuizListContext.Provider>
    );
  }
}

export default class QuizListProviderContainer extends React.Component {
  render() {
    return (
      <AuthProvider.Consumer>
        {({ isLoggedIn, userId }) => {
          return (
            <QuizListProvider isLoggedIn={isLoggedIn} userId={userId}>
              {this.props.children}
            </QuizListProvider>
          );
        }}
      </AuthProvider.Consumer>
    );
  }
}
