import React, { createContext } from "react";
import firebase from "firebase";
import FirebaseMetaData from "../constants/firebase-meta-data";

export const DraftQuizContext = createContext({
  questions: {
    "init-question-id": {
      question: "",
      options: {
        "init-id": {
          text: ""
        }
      }
    }
  }
});

export default class DraftQuiz extends React.Component {
  static Consumer = DraftQuizContext.Consumer;

  state = {
    questions: {
      [`question-${new Date().getTime()}`]: {
        question: "",
        options: {
          "init-id": {
            text: ""
          }
        }
      }
    }
  };

  db = firebase.firestore();

  constructor(props) {
    super(props);
    this.state.updateQuestion = this.updateQuestion;
    this.state.updateOption = this.updateOption;
    this.state.addNewOption = this.addNewOption;
    this.state.removeOption = this.removeOption;
    this.state.addNewQuestion = this.addNewQuestion;
    this.state.removeQuestion = this.removeQuestion;
    this.state.createQuiz = this.createQuiz;
  }

  updateQuestion = (id, text) => {
    this.setState(state => {
      return {
        questions: {
          ...state.questions,
          [id]: { ...state.questions[id], text }
        }
      };
    });
  };

  updateOption = (questionId, optionId, text) => {
    this.setState(state => {
      const question = state.questions[questionId];
      const option = question.options[optionId];
      const updatedQuestion = {
        ...question,
        options: {
          ...question.options,
          [optionId]: { ...option, text }
        }
      };
      return {
        questions: {
          ...state.questions,
          [questionId]: updatedQuestion
        }
      };
    });
  };

  addNewOption = questionId => {
    this.setState(state => {
      const question = state.questions[questionId];
      if (Object.keys(question.options).length >= 4) {
        return;
      }
      const updatedQuestion = {
        ...question,
        options: {
          ...question.options,
          [`${questionId}-option-${new Date().getTime()}`]: { text: "" }
        }
      };
      return {
        questions: {
          ...state.questions,
          [questionId]: updatedQuestion
        }
      };
    });
  };

  removeOption = (questionId, optionId) => {
    this.setState(state => {
      const question = state.questions[questionId];
      const options = question.options;
      delete options[optionId];
      const updatedQuestion = {
        ...question,
        options: { ...options }
      };
      return {
        questions: {
          ...state.questions,
          [questionId]: updatedQuestion
        }
      };
    });
  };

  addNewQuestion = () => {
    this.setState(state => {
      const questionId = `question-${new Date().getTime()}`;
      return {
        questions: {
          ...state.questions,
          [questionId]: {
            text: "",
            options: {
              [`${questionId}-option-${new Date().getTime()}`]: {
                text: ""
              }
            }
          }
        }
      };
    });
  };

  removeQuestion = questionId => {
    this.setState(state => {
      const updatedQuestions = { ...state.questions };
      delete updatedQuestions[questionId];
      return { questions: updatedQuestions };
    });
  };

  createQuiz = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const quizCollection = await this.db.collection(
        FirebaseMetaData.Collections.QUIZ.name
      );
      const userCollection = await this.db.collection(
        FirebaseMetaData.Collections.USER.name
      );

      const generatedDoc = await quizCollection.doc();
      const userDocRef = userCollection.doc(userId);

      await this.db.runTransaction(async transaction => {
        // Create user if doesn't exist
        const userDoc = await transaction.get(userDocRef);

        if (!userDoc.exists) {
          await transaction.set(userDocRef, { quizIds: [] });
        }

        await transaction.set(generatedDoc, {
          questions: this.state.questions,
          time: firebase.firestore.Timestamp.now()
        });

        await transaction.update(userDocRef, {
          quizIds: firebase.firestore.FieldValue.arrayUnion(generatedDoc.id)
        });
      });
    } catch (error) {
      return false;
    }
    return true;
  };

  render() {
    return (
      <DraftQuizContext.Provider value={this.state}>
        {this.props.children}
      </DraftQuizContext.Provider>
    );
  }
}
