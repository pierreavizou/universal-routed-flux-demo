import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import browserify from 'browserify-middleware';
import http from 'http';
import TodoActions from './flux-infra/actions/TodoActions';
import TodoStorageService from './services/TodoStorageService';
import babelify from 'babelify';
import {match, RoutingContext} from 'react-router';
import routes from './routes/routes';
import initApi from './api/socketApi';

var app = express();
const HOST = process.env.HOST || 'http://localhost:3000';

//browserify.settings.mode = 'production'; //uncomment to disable source watching and enable minification
browserify.settings({transform: ['babelify']});

var shared = ['react', 'react-dom', 'react-router/umd/ReactRouter', 'history'];

// When a client requests the paths below, we serve a browserified and babelified version of the files.
app.use('/build/shared.js', browserify(shared));
app.use('/build/bundle.js', browserify('./app.js', {
    external: shared
}));

app.use(express.static(__dirname));

app.get('*', function(req, res){

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        }
        else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }
        else if (renderProps) {

            TodoStorageService.read(function(err, data){
                if(err !== null){
                    console.log(err);
                    res.send('Erreur : ' + err);
                    res.end();
                    return;
                }
                // This action dispatches the READ_SUCCESS action to the store
                // along with the data. It then executes the callback passed as
                // the second parameter. Here, it renders the app and sends the
                // HTML to the template.
                TodoActions.sendTodos(data, function(){
                    var todoAppHtml = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
                    res.render('todo.ejs', {
                        todoapp: todoAppHtml,
                        todos: JSON.stringify(data),
                        host: HOST
                    });
                });
            });
        }
        else {
            res.status(404).send('Not found');
        }
    });
});

var server = http.createServer(app);
server.listen(3000, function() {
    console.log('Listening on port 3000...');
    initApi(server, TodoStorageService);
});
