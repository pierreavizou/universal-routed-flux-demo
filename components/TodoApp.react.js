import Footer from './Footer.react';
import Header from './Header.react';
import MainSection from './MainSection.react';
import React from 'react';
import TodoStore from '../flux-infra/stores/TodoStore';
import TodoActions from '../flux-infra/actions/TodoActions';
import {Link} from 'react-router';

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

export default class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.state = getTodoState();
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount(){
        TodoStore.addChangeListener(this._onChange);
        TodoActions.initSocket(); // We initialize the websocket connection as soon as the TodoApp component has mounted
    }

    componentWillUnmount(){
        TodoStore.removeChangeListener(this._onChange);
    }

    _onChange(){
        this.setState(getTodoState());
    }

    render(){
        return (
            <div>
                <div id="todoapp">
                    <Header />
                    <MainSection
                        allTodos={this.state.allTodos}
                        areAllComplete={this.state.areAllComplete}
                    />
                    <Footer allTodos={this.state.allTodos} />
                </div>
                <div id="logs">
                    {this.props.children || <Link to="/todo/logs">Display logs</Link>}
                </div>
            </div>
        );
    }
}
