import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.css';
import ROUTES from '../../utils/routes';
import AccountPage from '../../pages/AccountPage';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage}/>
        <Route exact path={ROUTES.HOME} component={AccountPage}/>
        <Route exact path={ROUTES.LOGIN} component={LoginPage}/>
        <Route exact path={ROUTES.REGISTER} component={RegisterPage}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
