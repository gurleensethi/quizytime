import React, { createContext } from "react";
import AuthProvider from "./AuthProvider";

const QuizListContext = createContext({});

class QuizListProvider extends React.Component {
  static Consumer = QuizListContext.Consumer;

  state = {};

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
        {({ isLoggedIn }) => {
          return (
            <QuizListProvider isLoggedIn={isLoggedIn}>
              {this.props.children}
            </QuizListProvider>
          );
        }}
      </AuthProvider.Consumer>
    );
  }
}
