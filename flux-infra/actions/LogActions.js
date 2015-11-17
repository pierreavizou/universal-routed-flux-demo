import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';

var LogActions = {
    clearLogs: function(){
        AppDispatcher.dispatch({
            actionType: 'LOG_DELETE'
        });
    }
}

module.exports = LogActions;
