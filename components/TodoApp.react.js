import Footer from './Footer.react';
import Header from './Header.react';
import MainSection from './MainSection.react';
import React from 'react';
import TodoStore from '../flux-infra/stores/TodoStore';
import TodoActions from '../flux-infra/actions/TodoActions';
import {Link} from 'react-router';
import {Container} from 'flux/utils';

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

class TodoApp extends React.Component{
    constructor(props){
        super(props);
    }

    static getStores() {
        return [TodoStore];
    }

    static calculateState(){
        return getTodoState();
    }

    componentDidMount(){
        // We initialize the websocket connection as soon as the TodoApp component has mounted
        TodoActions.initSocket();
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
export default Container.create(TodoApp);
