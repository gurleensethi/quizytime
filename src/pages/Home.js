import React from "react";
import AuthProvider from "../context/AuthProvider";
import QuizList from "../components/quiz_list/QuizList";
import QuizListProviderContainer from "../context/QuizListProvider";

export default class Home extends React.Component {
  render() {
    return (
      <AuthProvider.Consumer>
        {({ logout }) => {
          return (
            <div
              className="blue"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <QuizListProviderContainer.Consumer>
                {({ userQuizes }) => {
                  return <QuizList quizes={userQuizes} />;
                }}
              </QuizListProviderContainer.Consumer>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </div>
          );
        }}
      </AuthProvider.Consumer>
    );
  }
}
