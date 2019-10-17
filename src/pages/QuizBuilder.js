import React from "react";
import PrimaryInput from "../components/primary_input/PrimaryInput";
import OptionsBuilder from "../components/OptionsBuilder";
import DraftQuiz from "../context/DraftQuiz";

export default class QuizBuilderPage extends React.Component {
  handleQuizQuestionsClick = () => {
    this.props.history.push("/editor/questions");
  };

  render() {
    const questionId = this.props.match.params.id;
    return (
      <div
        className="teal darken-1"
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            flexGrow: 1,
            overflowY: "scroll"
          }}
        >
          <div className="row white-text container">
            <div
              className="center"
              style={{
                fontSize: "24px",
                padding: "40px"
              }}
            >
              Question Builder
            </div>
            <div className="col s12 white-text">
              <DraftQuiz.Consumer>
                {({
                  questions,
                  updateQuestion,
                  updateOption,
                  addNewOption,
                  removeOption
                }) => {
                  const question = questions[questionId];
                  if (!question) {
                    this.props.history.push("/editor/questions");
                    return;
                  }
                  return (
                    <div>
                      <PrimaryInput
                        placeholder="Enter Question"
                        value={question.text || ""}
                        onChange={text => {
                          updateQuestion(questionId, text);
                        }}
                      />
                      <div style={{ margin: "24px 0" }}>Options:</div>
                      <OptionsBuilder
                        options={question.options}
                        onOptionAdd={() => addNewOption(questionId)}
                        onOptionDelete={optionId => {
                          removeOption(questionId, optionId);
                        }}
                        onOptionChange={(id, text) => {
                          updateOption(questionId, id, text);
                        }}
                      />
                    </div>
                  );
                }}
              </DraftQuiz.Consumer>
            </div>
          </div>
        </div>
        <div>
          <button
            style={{
              width: "100%",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            className="btn purple"
            onClick={this.handleQuizQuestionsClick}
          >
            <i className="material-icons">menu</i>
            <span style={{ marginLeft: "4px" }}>Quiz Questions</span>
          </button>
        </div>
      </div>
    );
  }
}
