import React from 'react';
import { Router, Route} from 'react-router/umd/ReactRouter';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

var history;
if (typeof(window) !== 'undefined'){
    history = createBrowserHistory();
}
else {
    history = createMemoryHistory(); //This kind of history is needed for server-side rendering.
}

import TodoApp from '../components/TodoApp.react';
import LogDiv from '../components/Logs.react';
import AppContainer from '../components/AppContainer.react';

var routes = (
    <Router history={history}>
        <Route path="/" component={AppContainer}>
            <Route path="todo" component={TodoApp}>
                <Route path="logs" component={LogDiv} />
            </Route>
        </Route>
    </Router>
);

export default routes;
