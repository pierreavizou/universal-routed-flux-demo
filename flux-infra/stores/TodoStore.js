/* jshint browser: true */
import AppDispatcher from '../dispatcher/AppDispatcher';
// import {EventEmitter} from 'events';
import TodoConstants from '../constants/TodoConstants';
import TodoActions from '../actions/TodoActions';
import {Store} from 'flux/utils';
import Immutable from 'immutable';

//connect to server only if the code is executed client-side.
if(typeof window !== 'undefined'){
    var socket = require('socket.io-client')(window.HOST || 'localhost:3000', {transports: ['websocket']});
}

// var CHANGE_EVENT = 'change';

var TodoRecord = Immutable.Record({
  id: undefined,
  complete: false,
  text: "",
  pending: false
});

var _todos;

function receiveTodos(todos){
    // We first create a new OrderedMap to store the todos from the server
    _todos = Immutable.OrderedMap()
    for (var id in todos){
        _todos = _todos.set(id, new TodoRecord(todos[id]));
    }
}

function create(text){
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos = _todos.set(id, new TodoRecord({id : id, text : text, pending:true}));
    socket.emit('todoupdate', JSON.stringify(_todos.get(id)));
}

function update(id, updates){
    _todos = _todos.setIn([id, 'pending'], true);
    _todos = _todos.set(id, _todos.get(id).merge(updates));
    socket.emit('todoupdate', JSON.stringify(_todos.get(id)));
}

function updateAll(updates){
    for (var id in _todos.toObject()) {
    update(id, updates);
  }
}

function updateStateOnServerSuccess(id){
    console.log('server received todo: ' + id);
    _todos = _todos.setIn([id, 'pending'], false);

}

function destroy(id){
    _todos = _todos.setIn([id, 'pending'], true);
    socket.emit('tododelete', JSON.stringify(_todos.get(id)));
}

function destroyWhenCompleteOnServer(id){
    console.log("delete success server");
    _todos = _todos.delete(id);
}

function destroyCompleted(){
    for (var id in _todos.toObject()) {
        if (_todos.getIn([id, 'complete'])) {
            _todos = _todos.setIn([id, 'pending'], true);
            socket.emit('tododelete', JSON.stringify(_todos.get(id)));
        }
    }
}

function initSocket(){
    socket.on('todoreceived', function(id){
        TodoActions.updateSuccess(id);
    });
    socket.on('tododeleted', function(id){
        TodoActions.deleteSuccess(id);
    });
    socket.on('servererror', function(err){
        TodoActions.serverError(err);
    });
    socket.on('connected', function(){
        TodoActions.serverConnected(window.HOST || 'localhost:3000');
    });
}

class TodoStore extends Store {
    constructor(dispatcher){
        super(dispatcher);
    }

    areAllComplete(){
        for (var todo of _todos.values()) {
            if (!todo.get('complete')) {
                return false;
            }
        }
        return true;
    }

    getAll(){
        return _todos.toObject();
    }

    __onDispatch(action) {
        var text;
        switch(action.actionType) {
            case TodoConstants.INIT_SOCKET:
                initSocket();
                break;

            case TodoConstants.READ_SUCCESS:
                receiveTodos(action.todos);
                this.__emitChange();
                break;

            case TodoConstants.TODO_CREATE:
                text = action.text.trim();
                if (text !== '') {
                    create(text);
                    this.__emitChange();
                }
                break;

            case TodoConstants.TODO_SERVER_SUCCESS:
                updateStateOnServerSuccess(action.id);
                this.__emitChange();
                break;

            case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
                if (this.areAllComplete()) {
                    updateAll({complete: false});
                } else {
                    updateAll({complete: true});
                }
                this.__emitChange();
                break;

            case TodoConstants.TODO_UNDO_COMPLETE:
                update(action.id, {complete: false});
                this.__emitChange();
                break;

            case TodoConstants.TODO_COMPLETE:
                update(action.id, {complete: true});
                this.__emitChange();
                break;

            case TodoConstants.TODO_UPDATE_TEXT:
                text = action.text.trim();
                if (text !== '') {
                    update(action.id, {text: text});
                    this.__emitChange();
                }
                break;

            case TodoConstants.TODO_DESTROY:
                destroy(action.id);
                this.__emitChange();
                break;

            case TodoConstants.TODO_DELETE_SERVER_SUCCESS:
            destroyWhenCompleteOnServer(action.id);
            this.__emitChange();
            break;

            case TodoConstants.TODO_DESTROY_COMPLETED:
                console.log('destroyCompleted');
                destroyCompleted();
                this.__emitChange();
                break;

            default:
            // no op
        }
    }
}

var todoStoreObj = new TodoStore(AppDispatcher);
export default todoStoreObj;
