
const Task = require('./task');

/**
 * _listado:
 *      { 'uuid-12346789-123123-123123-123123': { id: 12, desc: 'asd', completedIn: 123123 }}
 */

class Tasks {
    
    _list = {};

    get listArr() {

        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push(task);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    loadTasksFromArray( tasks = [] ) {

        tasks.forEach( task => {
            this._list[task.id] = task;
        });
    }

    createTask(desc = '') {

        const task = new Task(desc);
        this._list[task.id] = task;
    }

    completeList() {
        
        this.listArr.forEach(( task, i ) => {
            const idx = `${ i + 1 }`.green;
            const { desc, completedIn } = task;
            const state = ( completedIn ) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${ idx } ${ desc } :: ${ state }`);
        });
    }
}


module.exports = Tasks;