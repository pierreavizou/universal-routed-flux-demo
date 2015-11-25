import AppDispatcher from '../dispatcher/AppDispatcher';

var LogActions = {
    clearLogs: function(){
        AppDispatcher.dispatch({
            actionType: 'LOG_DELETE'
        });
    }
};

module.exports = LogActions;
