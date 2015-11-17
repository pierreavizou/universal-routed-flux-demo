import React from 'react';
import TodoActions from '../flux-infra/actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';

export default class Header extends React.Component{

    constructor(props){
        super(props);
    }

    /**
     * @return {object}
     */
    render () {
        return (
            <header id="header">
                <h1>Universal todos</h1>
                <TodoTextInput
                    id="new-todo"
                    placeholder="What needs to be done?"
                    onSave={this._onSave}
                    saveOnBlur={false}
                />
            </header>
        );
    }

    /**
     * Event handler called within TodoTextInput.
     * Defining this here allows TodoTextInput to be used in multiple places
     * in different ways.
     * @param {string} text
     */
    _onSave (text) {
        if (text.trim()){
            TodoActions.create(text);
        }
    }
}
