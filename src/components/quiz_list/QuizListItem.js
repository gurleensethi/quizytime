import React from "react";

export default class QuizListItem extends React.Component {
  render() {
    const { quiz } = this.props;
    const questionsInQuiz = Object.keys(quiz.questions).length;
    const questionsInQuizSuffix =
      questionsInQuiz > 1 ? "questions in quiz." : "question in quiz.";
    return (
      <div
        style={{
          padding: "20px"
        }}
      >
        {quiz.quizName}
        <div>{`${questionsInQuiz} ${questionsInQuizSuffix}`}</div>
      </div>
    );
  }
}
