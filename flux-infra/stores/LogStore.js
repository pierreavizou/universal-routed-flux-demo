import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';

var CHANGE_EVENT = 'change';

var _logs = [];

function addLog(text, item) {
    _logs.push(text + " : " + item);
    //console.log("log ajouté.");
}

function clearLogs(){
    console.log('Clearing logs');
    _logs = [];
}

class LogStore extends EventEmitter{
    constructor(){
        super();
    }

    getState(){
        return {
            logs: _logs
        };
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }
}

var logStoreObj = new LogStore();

AppDispatcher.register(function(payload){
    if (payload.actionType === 'LOG_DELETE'){
        clearLogs();
        logStoreObj.emitChange();
        return;
    }
        addLog(payload.actionType, payload.text || payload.id);
        logStoreObj.emitChange();
    //addLog(payload.actionType);
});

export default logStoreObj;
