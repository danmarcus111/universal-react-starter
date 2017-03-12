import React, {Component} from 'react';

class Main extends Component {
   componentDidMount() {
    // This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
    if (typeof componentHandler === 'object') { 
      componentHandler.upgradeDom();
    }

   }
   componentDidUpdate() {
    // This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
    if (typeof componentHandler === 'object') { 
      componentHandler.upgradeDom();
    }
    
  }
  
  render() {
    return (<div>
      <p>This was rendered by React because we are at location '/'.</p>
      <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
        Button
      </button>
    </div>);
  }
}

export default Main;