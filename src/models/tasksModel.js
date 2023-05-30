const connection = require('./connection');

const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const createTask = async (tasks) => {
    const { title } = tasks;

    const dateUTC = new Date(Date.now()).toUTCString();

    const [createdTask] = await connection.execute ('INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)', [title, 'pendente', dateUTC]); 

    return {insertId: createdTask.insertId};
};

const deleteTask = async (id) => {
    const removedtask = await connection.execute('DELETE FROM tasks WHERE id = ?',[id]);
    return removedtask;
};

const updateTask = async (id, task) => {
    const {title, status} = task;

    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    

    const [updatedTask] = await connection.execute(query, [title, status, id]);
    return updatedTask;
};


module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask 
}