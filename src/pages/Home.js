import React from "react";
import AuthProvider from "../context/AuthProvider";
import QuizList from "../components/quiz_list/QuizList";

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
                <QuizList />
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
