import React from 'react';
import LogStore from '../flux-infra/stores/LogStore';
import LogActions from '../flux-infra/actions/LogActions';
var shallowCompare = require('react-addons-shallow-compare');

function getLogState(){
    return LogStore.getState();
}

export default class LogDiv extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentDidUpdate () {
        console.log("OK, updated logs");
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
        var logEntries = [];
        var clearButton;
        var logs = this.state ? this.state.logs.toJS() : [];
        if(logs.length > 0){
            clearButton = <button id="clearLogs" type="button" onClick={this._clearLogs}>Clear logs</button>;
        }

        for (var i = logs.length - 1; i >= 0; i--) {
            logEntries.push(<li key={i}>{logs[i]}</li>);
        }
        return (
            <div>
                <ul>
                    {logEntries}
                </ul>
                {clearButton}
            </div>
        );
    }

    _clearLogs(){
        LogActions.clearLogs();
    }
}
