import React from 'react';
import TodoActions from '../flux-infra/actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';
import classNames from 'classnames';
var ReactPropTypes = React.PropTypes;
var shallowCompare = require('react-addons-shallow-compare');

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
        this._onToggleComplete = this._onToggleComplete.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onDoubleClick = this._onDoubleClick.bind(this);
        this._onDestroyClick = this._onDestroyClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentDidUpdate (prevProps) {
        console.log(prevProps === this.props);
        if (prevProps === this.props) return;
        
        console.log("OK, updated node with key " + this.props.todo.id);
    }

    render() {
        var todo = this.props.todo;
        var input;
        if (this.state.isEditing) {
            input =
            <TodoTextInput
                className="edit"
                onSave={this._onSave}
                value={todo.text}
            />;
        }

        // List items should get the class 'editing' when editing
        // and 'completed' when marked as completed.
        // Note that 'completed' is a classification while 'complete' is a state.
        // This differentiation between classification and state becomes important
        // in the naming of view actions toggleComplete() vs. destroyCompleted().
        return (
            <li
                className={classNames({
                    'completed': todo.complete,
                    'editing': this.state.isEditing,
                    'pending': todo.pending
                })}
                key={todo.id}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.complete}
                        onChange={this._onToggleComplete}
                    />
                    <label onDoubleClick={this._onDoubleClick} onTouchEnd={this._onDoubleClick}>
                        {todo.text}
                    </label>
                    <button className="destroy" onClick={this._onDestroyClick} />
                </div>
                {input}
            </li>
        );
    }

    _onToggleComplete() {
        TodoActions.toggleComplete(this.props.todo);
    }

    _onDoubleClick() {
        this.setState({isEditing: true});
    }

    /**
     * Event handler called within TodoTextInput.
     * Defining this here allows TodoTextInput to be used in multiple places
     * in different ways.
     * @param  {string} text
     */
    _onSave(text) {
        if (this.props.todo.text === text){
            this.setState({isEditing: false});
            return;
        }
        TodoActions.updateText(this.props.todo.id, text);
        this.setState({isEditing: false});
    }

    _onDestroyClick() {
        TodoActions.destroy(this.props.todo.id);
    }
}

TodoItem.propTypes = {todo: ReactPropTypes.object.isRequired};
