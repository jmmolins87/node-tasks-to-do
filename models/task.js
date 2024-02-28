const { v4: uudiv4 } = require('uuid');

class Task {

    id = '';
    desc = '';
    completedIn = null;

    constructor( desc ) {
        this.id = uudiv4(); // Genera un id único
        this.desc = desc;
        this.completedIn = null;
    }
}

module.exports = Task;