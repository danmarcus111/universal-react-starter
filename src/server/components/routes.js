import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './App';
import Main from './Main';

export default (
	<Route path="/" component={App}> 
		<IndexRoute component={Main} />
  </Route>
);