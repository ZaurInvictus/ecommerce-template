import React from 'react';
import ReactDOM from 'react-dom';
//import serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'gestalt/dist/gestalt.css'

import App from './components/App';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Checkout from './components/Checkout';




const Root = () => (
  <Router>
    <React.Fragment>
     <Navbar/>
      <Switch>
        <Route component={App} exact path="/" />
        <Route component={Signin} path="/signin" />
        <Route component={Signup} path="/signup" />
        <Route component={Checkout} path="/checkout" />
      </Switch>
     </React.Fragment>
  </Router>
)


ReactDOM.render(<Root />, document.getElementById('root'));


