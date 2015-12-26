import React from 'react';
import LogStore from '../flux-infra/stores/LogStore';
import LogActions from '../flux-infra/actions/LogActions';
// import {Container} from 'flux/utils';

function getLogState(){
    return LogStore.getState();
}

export default class LogDiv extends React.Component {
    constructor(props) {
        super(props);
        // Needed to fix markup inconsistency between client and server.
        this.state = {logs: []};
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount(){
        console.log('logs mounted');
        // addListener is inherited from flux/utils/Store
        // Will only be added client-side (componentDidMount() is not executed on the server)
        // This is required because the server does not maintain the log state.
        LogStore.addListener(this._onChange);
        this.setState(getLogState());
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
        }
        return (
            <div>
                <ul>
                    {logs}
                </ul>
                {clearButton}
            </div>
        );
    }

    _clearLogs(){
        LogActions.clearLogs();
    }
}
