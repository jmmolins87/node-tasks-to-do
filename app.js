require('colors');

const { inquirerMenu, pause } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

const main = async() => {

    let opt = '';
    const tasks = new Tasks();

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // crear opción
            break;
            case '2':
                // listar 
            break;
        }

        await pause();
    } while (opt !== '0');
}



main();