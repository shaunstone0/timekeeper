import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './ultis/setAuthToken';
// CSS Import
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const loginContainer = () => (
  <Fragment>
    <div className='login-container'>
      <Alert />
      <Route exact path='/' component={Login} />
    </div>
  </Fragment>
);

const registerContainer = () => (
  <Fragment>
    <div className='login-container'>
      <Alert />
      <Route exact path='/register' component={Register} />
    </div>
  </Fragment>
);

const defaultContainer = () => (
  <Fragment>
    <Navbar />
    <Alert />
    <section className='container'>
      <Route exact path='/landing' component={Landing} />

      <PrivateRoute exact path='/dashboard' component={Dashboard} />
    </section>
  </Fragment>
);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/register' component={registerContainer} />
          <Route exact path='/' component={loginContainer} />
          <Route component={defaultContainer} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
