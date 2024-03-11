require('colors');

const { 
    inquirerMenu, 
    pause, 
    readInput,
    listTasksToDelete,
    confirm,
    showListCheckList
} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');
const { saveDB, readDB } = require('./helpers/saveFile');

const main = async() => {

    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if( tasksDB ) {
        // * Establecer tareas
        tasks.loadTasksFromArray( tasksDB );
    }

    do {
        // * Imprimir menú
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // * Crear opción
                const desc = await readInput('Descripción:');
                tasks.createTask(desc);
            break;
            case '2':
                // * Listar 
                tasks.completeList();
            break;
            case '3':
                // * Listar completadas
                tasks.pendingCompletedList(true);
            case '4':
                // * Listar pendientes
                tasks.pendingCompletedList(false);
            break;
            case '5':
                // * Completar tarea(s)
                const ids = await showListCheckList( tasks.listArr );
                tasks.toggleCompleted( ids );
            break;
            case '6':
                // * Borrar tarea
                const id = await listTasksToDelete( tasks.listArr ); 
                if( id !== '0' ) {
                    const ok = await confirm('¿Está seguro?');
                    if( ok ) {
                        tasks.deleteTask( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        saveDB( tasks.listArr );

        await pause();
    } while (opt !== '0');
}

main();