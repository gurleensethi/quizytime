const FirebaseMetaData = {};

const Collections = {
  QUIZ: {
    name: "quiz"
  },
  USER: {
    name: "user",
    QUIZ_IDS: {
      name: "quizids"
    }
  }
};

FirebaseMetaData.Collections = Collections;

export default FirebaseMetaData;
