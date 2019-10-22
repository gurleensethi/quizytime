import React from "react";
import QuizListItem from "./QuizListItem";

export default class QuizList extends React.Component {
  render() {
    const { quizes } = this.props;
    console.log(quizes);

    const hasQuizes = quizes !== undefined && quizes.length > 0;
    const quizesComponent = hasQuizes ? (
      quizes.map((quiz, index) => <QuizListItem key={index} quiz={quiz} />)
    ) : (
      <p>You have not created any quizes.</p>
    );
    return <div>{quizesComponent}</div>;
  }
}
