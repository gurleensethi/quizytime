import React, { createContext } from "react";
import AuthProvider from "./AuthProvider";
import FirebaseMetaData from "../constants/firebase-meta-data";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const QuizListContext = createContext({});

class QuizListProvider extends React.Component {
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
      .get()
      .then(snapshot => {
        const quizData = snapshot.data() || {};
        const quizIds = quizData.quizIds || [];
        return quizIds.map(id =>
          firebase
            .firestore()
            .doc(`${FirebaseMetaData.Collections.QUIZ.name}/${id}`)
            .get()
        );
      })
      .then(promises => Promise.all(promises))
      .then(quizes => quizes.map(quiz => quiz.data()));

    this.setState(prevState => ({ userQuizes: quizes }));
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
  static Consumer = QuizListContext.Consumer;
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
