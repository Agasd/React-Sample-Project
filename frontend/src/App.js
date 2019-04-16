import React, {Component} from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";

import {Home} from './components/Home'
import {Single} from './components/Single'

class App extends Component {
    render() {
       return(
           <Router>
               <Route path="/" exact component={Home} />
               <Route path="/schedule" component={Single} />
           </Router>
       );
    }
}

export default App;
