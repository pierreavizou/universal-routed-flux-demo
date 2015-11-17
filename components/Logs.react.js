import React from 'react';
import LogStore from '../flux-infra/stores/LogStore';
import LogActions from '../flux-infra/actions/LogActions';

function getLogState(){
    return LogStore.getState();
}

export default class LogDiv extends React.Component {
    constructor(props) {
        super(props);
        // Needed to fix markup inconsistency between client and server.
        //TODO: fix in a more elegant way.
        this.state = {logs: {}};
        //needed as React does not autobind non-react method when used in es6.
        this._onChange = this._onChange.bind(this);
    }
    componentDidMount(){
        console.log('logs mounted');
        LogStore.addChangeListener(this._onChange);
        this.setState(getLogState());
    }

    componentWillUnmount(){
        LogStore.removeChangeListener(this._onChange)
    }

    _onChange(){
        this.setState(getLogState());
    }

    render(){
        var logs = [];
        var clearButton;
        if(this.state.logs.length > 0){
            clearButton = <button id="clearLogs" type="button" onClick={this._clearLogs}>Clear logs</button>;
        }

        for (var i = this.state.logs.length - 1; i >= 0; i--) {
            logs.push(<li key={i}>{this.state.logs[i]}</li>);
        };
        return (
            <div>
                <ul>
                    {logs}
                </ul>
                {clearButton}
            </div>
        )
    }

    _clearLogs(){
        LogActions.clearLogs();
    }
}
