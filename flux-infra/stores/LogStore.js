import AppDispatcher from '../dispatcher/AppDispatcher';
import {Store} from 'flux/utils';


var _logs = [];

function addLog(text, item) {
    _logs.push(text + " : " + item);
    //console.log("log ajouté.");
}

function clearLogs(){
    console.log('Clearing logs');
    _logs = [];
}

class LogStore extends Store {
    constructor(dispatcher){
        super(dispatcher);
    }

    getState(){
        return {
            logs: _logs
        };
    }

    __onDispatch(payload){
        if (payload.actionType === 'LOG_DELETE'){
            clearLogs();
            this.__emitChange();
            return;
        }
            addLog(payload.actionType, payload.text || payload.id);
            this.__emitChange();
    }
}

var logStoreObj = new LogStore(AppDispatcher);

export default logStoreObj;
