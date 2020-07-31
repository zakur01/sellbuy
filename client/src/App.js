import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import Navbar from "./components/layout/navbar";
import MainPage from "./components/layout/mainpage";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/routing/privateRoute";
import Alert from "./components/layout/alert";
import CreateProfile from './components/profile-form/createProfile'
import EditProfile from './components/profile-form/editProfile'
import Profiles from './components/profiles/profiles'
import Profile from './components/profile/profile'
import Posts from './components/posts/posts'
import Post from './components/post/post'
import NewPost from './components/posts/newPost'
import history from './history'


const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
      store.dispatch(loadUser());
  }, []);
// 
  
  
  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Navbar />
            <Alert />
            <Switch>
          <Route exact path="/" component={MainPage} />
          <section className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/newpost" component={NewPost} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/posts/:id" component={Post} />
          </section>
            </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
