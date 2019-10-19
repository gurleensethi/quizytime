import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import QuizBuilder from "./pages/QuizBuilder";
import QuizQuestionsContainer from "./pages/QuizQuestions";
import DraftQuiz from "./context/DraftQuiz";
import QuizComplete from "./pages/QuizComplete";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import firebase from "firebase";
import firebaseConfig from "./config/firebase.config";
import AuthProvider from "./context/AuthProvider";
import {
  PrivateRoute,
  PublicRoute,
  NonDirectAccessRoute
} from "./routes/CustomRoutes";
import { AppRoutes } from "./routes/AppRoutes";
import NotFound from "./pages/NotFound";

// Firebase initialization
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  render() {
    return (
      <DraftQuiz>
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <PrivateRoute
                exact
                path={AppRoutes.EDITOR_QUESTION_ID}
                component={QuizBuilder}
              />
              <PrivateRoute
                exact
                path={AppRoutes.EDITOR_QUESTION}
                component={QuizQuestionsContainer}
              />
              <NonDirectAccessRoute
                exact
                path={AppRoutes.EDITOR_QUIZ_COMPLETE}
                component={QuizComplete}
              />
              <PublicRoute exact path={AppRoutes.SIGNIN} component={SignIn} />
              <PrivateRoute exact path={AppRoutes.HOME} component={Home} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </DraftQuiz>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
