import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';

const TodoActions = {

    /**
     * Action fired when the TodoApp component has successfully mounted.
     * Sets up event listeners to respond to successes or failures from the server and dispateches
     * appropriate payload to let the app know it's been connected to the server.
     */
    initSocket: function(){
        console.log('socket initialisée');
        socket.on('todoreceived', function(id){
            setTimeout(function(){
                this.updateSuccess(id);
            }, 2000);
        });
        socket.on('tododeleted', function(id){
            setTimeout(function(){
                this.deleteSuccess(id);
            }, 2000);
        });
        AppDispatcher.dispatch({
            actionType: 'SOCKET_CONNECTED'
        });
    },

    /**
     * Action fired when the server has successfully retrieved the todos and passes them to the app
     * @param {object} todos The list of todos
     * @param {function} callback The callback to execute after dispatching the action
     */

    sendTodos: function(todos, callback){
        AppDispatcher.dispatch({
            actionType: 'READ_SUCCESS',
            todos:todos,
        });
        callback();
    },

    /**
    * @param  {string} text
    */
    create: function(text) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CREATE,
            text: text
        });
    },

    /**
     * Action fired when a todo is successfully added to the list.
     * @param  {string} text
     */
    updateSuccess: function(id){
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_SERVER_SUCCESS,
            id
        });
    },

    /**
     * Action fired when a todo is successfully deleted from the list.
     * @param  {string} id The ID of the ToDo item
     */

    deleteSuccess: function(id){
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_DELETE_SERVER_SUCCESS,
            id
        });
    },

    /**
     * @param  {string} id The ID of the ToDo item
     * @param  {string} text
     */
    updateText: function(id, text) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_UPDATE_TEXT,
            id: id,
            text: text
        });
    },

    /**
     * Toggle whether a single ToDo is complete
     * @param  {object} todo
     */
    toggleComplete: function(todo) {
        var id = todo.id;
        var actionType = todo.complete ?
        TodoConstants.TODO_UNDO_COMPLETE :
        TodoConstants.TODO_COMPLETE;

        AppDispatcher.dispatch({
            actionType: actionType,
            id: id
        });
    },

    /**
     * Mark all ToDos as complete
     */
    toggleCompleteAll: function() {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
        });
    },

    /**
     * @param  {string} id
     */
    destroy: function(id) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_DESTROY,
            id: id
        });
    },

    /**
     * Delete all the completed ToDos
     */
    destroyCompleted: function() {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_DESTROY_COMPLETED
        });
    }
};

export default TodoActions;
