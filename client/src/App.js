import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./component/contexts/AuthContext";
import PostContextProvider from "./component/contexts/PostContext";
import Landing from "./component/Layout/Landing";
import ProtectedRoute from "./component/routing/ProtectedRoute";

import About from "./component/views/About";
import Auth from "./component/views/Auth";
import DashBoard from "./component/views/dashBoard";

function App() {
  return (
    <AuthContextProvider>
    <PostContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />

          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} authRoute="login" />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Auth {...props} authRoute="register" />}
          />
          <ProtectedRoute exact path='/dashboard' component={DashBoard} />
          <ProtectedRoute exact path='/about' component={About} />
        </Switch>
      </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
