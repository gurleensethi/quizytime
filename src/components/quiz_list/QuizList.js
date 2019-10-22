import React from "react";

export default class QuizList extends React.Component {
  render() {
    const { quizes } = this.props;
    console.log(quizes);

    const hasQuizes = quizes !== undefined && quizes.length > 0;
    const quizesComponent = hasQuizes ? (
      quizes.map((quiz, index) => {
        return (
          <div key={index}>
            {quiz.quizName}
            <div>{`${Object.keys(quiz.questions).length} questions`}</div>
          </div>
        );
      })
    ) : (
      <p>You have not created any quizes.</p>
    );
    return <div>{quizesComponent}</div>;
  }
}
