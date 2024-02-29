require('colors');

const { 
    inquirerMenu, 
    pause, 
    readInput 
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
                // TODO: completeList();
                console.log(tasks.listArr);
            break;
        }

        saveDB( tasks.listArr );

        await pause();
    } while (opt !== '0');
}

main();