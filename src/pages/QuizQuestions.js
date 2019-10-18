import React from "react";
import DraftQuiz from "../context/DraftQuiz";
import PrimaryInput from "../components/primary_input/PrimaryInput";

class QuizQuestions extends React.Component {
  handleQuestionClick = id => {
    this.props.history.push(`/editor/question/${id}`);
  };

  handleCreateQuizClick = () => {
    this.props.history.push(`/editor/quiz-complete/`);
    this.props.draftQuiz.createQuiz();
  };

  render() {
    const { questions } = this.props.draftQuiz;
    const questionLength = Object.keys(questions).length;
    const questionsJsx = Object.keys(questions)
      .sort()
      .map((key, index) => {
        const question = questions[key];
        return (
          <div key={key} style={{ padding: "10px", display: "flex" }}>
            <h5
              style={{ flexGrow: 1 }}
              onClick={() => this.handleQuestionClick(key)}
            >
              {question.text || `Question ${index + 1}`}
            </h5>
            <i
              className="material-icons"
              style={{
                marginLeft: "10px",
                opacity: questionLength === 1 ? 0.5 : 1.0
              }}
              onClick={
                questionLength === 1
                  ? undefined
                  : () => this.props.draftQuiz.removeQuestion(key)
              }
            >
              remove_circle
            </i>
          </div>
        );
      });

    return (
      <div
        className="purple white-text"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%"
        }}
      >
        <div style={{ flexGrow: "1", overflowY: "scroll" }}>
          <div
            className="center"
            style={{
              fontSize: "24px",
              padding: "40px"
            }}
          >
            <p>Questions</p>
            <br />
            <PrimaryInput placeholder="Name of Quiz" />
          </div>
          <div className="row" style={{ width: "100%" }}>
            {questionsJsx}
          </div>
        </div>
        <div
          style={{
            display: "flex"
          }}
        >
          <button
            className="btn green"
            style={{
              flexGrow: "1",
              minHeight: "50px",
              display: "flex",
              justifyContent: "center"
            }}
            onClick={() => this.props.draftQuiz.addNewQuestion()}
          >
            Add Question
            <i className="material-icons" style={{ marginLeft: "4px" }}>
              add
            </i>
          </button>
          <button
            className="btn orange"
            style={{
              flexGrow: "1",
              minHeight: "50px",
              display: "flex",
              justifyContent: "center"
            }}
            onClick={this.handleCreateQuizClick}
          >
            Complete Quiz
            <i className="material-icons" style={{ marginLeft: "4px" }}>
              done
            </i>
          </button>
        </div>
      </div>
    );
  }
}

export default class QuizQuestionsContainer extends React.Component {
  render() {
    return (
      <DraftQuiz.Consumer>
        {draftQuiz => {
          return <QuizQuestions {...this.props} draftQuiz={draftQuiz} />;
        }}
      </DraftQuiz.Consumer>
    );
  }
}
