import React, {Component} from 'react';
import Main from './Main';
import About from './About';
import {Route, Link} from 'react-router-dom';


class App extends Component {
  render() {
    return (<div>
      <p>This is rendered by React.</p>
      <p><Link to="/about">Click here to go to About page</Link></p>
      <Route exact path="/" component={Main}/>
      <Route path="/about" component={About}/>
    </div>);
  }
}

export default App;