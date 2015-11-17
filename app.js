import React from 'react';
import ReactDOM from 'react-dom';

import TodoActions from './flux-infra/actions/TodoActions';

import routes from './routes/routes';

// This action dispatches the READ_SUCCESS action to the store along with the data.
// It then executes the callback passed as the second parameter.
// Here, it renders the app and mounts it to the appropriate component.
// Dispatching this action both client- and server-side is necessary as it
// ensures that both will render the same markup beceause they have the same data.
TodoActions.sendTodos(window.App, function(){
    ReactDOM.render(
        routes,
      document.getElementById('todoappcontainer')
    );
});
