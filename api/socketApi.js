var initApi = function(server, todoStorageService){

    var io = require('socket.io').listen(server, {transports: ['websocket']});

    io.sockets.on('connection', function(socket){

        console.log('A new client connected to the server');

        socket.on('todoupdate', function(todo){
            console.log('new todo item received: ' + todo);
            var jTodo = JSON.parse(todo);
            //jTodo.pending = false;
            delete jTodo['pending']; //we do not need to store the 'pending' attribute so we can safely delete it.
            todoStorageService.write(jTodo, function(err){
                if(err !== null){
                    console.log('API error: ' + err);
                    socket.emit('servererror', JSON.stringify(err));
                    return;
                }
                socket.emit('todoreceived', jTodo.id);
            });
        });

        socket.on('tododelete', function(todo){
            var jTodo = JSON.parse(todo);
            todoStorageService.delete(jTodo.id, function(err){
                if(err !== null){
                    console.log('Errer: ' + err);
                    socket.emit('servererror', JSON.stringify(err));
                    return;
                }
                socket.emit('tododeleted', jTodo.id);
            });
        });
    });
}

export default initApi;
