import React from 'react';
import {Link} from 'react-router';


export default class AppContainer extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        var nav = <div>
            <p>
                <Link to="/todo">Todo list without logs</Link><br/>
                <Link to="/todo/logs">Todo list with logs</Link>
            </p>
        </div>;

        return (
                <div>
                    {this.props.children || nav}
                </div>
        )
    }
}
