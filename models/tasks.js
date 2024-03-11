
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

    deleteTask( id = '' ) {
        
        if ( this._list[id] ) {
            delete this._list[id];
        }
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
            const state = ( completedIn ) ? 
                                'Completada'.green : 
                                'Pendiente'.red;
            console.log(`${ idx } ${ desc } :: ${ state }`);
        });
    }

    pendingCompletedList( completed = true ) {
        
        console.log();
        let count = 0;
        this.listArr.forEach( task => {
            const { desc, completedIn } = task;
            const state = ( completedIn ) ?
                                'Completada'.green : 
                                'Pendiente'.red;
            if ( completed ) {
                // Mostrar completadas
                if ( completedIn ) {
                    count += 1;
                    console.log(`${ (count + '.').green } ${ desc } :: ${ state }`);
                }
            } else {
                // Mostrar pendientes
                if ( !completedIn ) {
                    count += 1;
                    console.log(`${ (count + '.').green } ${ desc } :: ${ state }`);
                }
            }
        });
    }

    toggleCompleted( ids = [] ) {
        
        ids.forEach( id => {
            const task = this._list[id];
            if( !task.completedIn ) {
                task.completedIn = new Date().toISOString();
            }
        });
        this.listArr.forEach( task => {
            if( !ids.includes(task.id) ) {
                this._list[task.id].completedIn = null;
            }
        });
    }
}


module.exports = Tasks;