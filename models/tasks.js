
const Task = require('./task');

/**
 * _listado:
 *      { 'uuid-12346789-123123-123123-123123': { id: 12, desc: 'asd', completedIn: 123123 }}
 */

class Tasks {
    
    _list = {};

    constructor() {
        this._list = {};
    }

    createTask(desc = '') {

        const task = new Task(desc);
        this._list[task.id] = task;
    }
}


module.exports = Tasks;