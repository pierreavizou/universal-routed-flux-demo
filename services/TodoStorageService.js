var fs = require('fs');
const RESPONSE_TIME = 300; //simulate server delay

export default class TodoStorageService {
    constructor(storePath = __dirname + '/todos.json') {
        console.log('storage service initialised');
        this._todos = {};
        this.storePath = storePath;    }
    write(todo, cb){
        this._todos[todo.id] = todo;
        setTimeout(() => {
            fs.writeFile(this.storePath, JSON.stringify(this._todos, null, 4), function(err){
                cb(err);
            });
        }, RESPONSE_TIME);
    }

    read(cb){
        fs.readFile(this.storePath, (err, data) => {
            setTimeout(() => {
                if (err !== null){
                    cb(err, null);
                    return;
                }
                this._todos = JSON.parse(data);
                cb(null, this._todos);
            }, RESPONSE_TIME)
        });
    }

    delete(id, cb){
        delete this._todos[id];
        setTimeout(() => {
            fs.writeFile(this.storePath, JSON.stringify(this._todos, null, 4), function(err){
                cb(err);
            });
        }, RESPONSE_TIME);
    }
}

export default new TodoStorageService();
