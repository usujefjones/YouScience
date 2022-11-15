import {v4 as newGuid} from 'uuid';

let tasks = [];

export const getTask = (req, res) => {
    res.send(tasks && tasks.filter(m => m.id === req.params.id)[0]);
}

export const getTasks = (req, res) => {
    //res.send(tasks);
    res.send(tasks);
}

export const createTask = (req, res) => {
    const task = req.body;
    task.id = newGuid();
    tasks.push(task);
    res.send(true);
}

export const deleteTask = (req, res) => {
    tasks = tasks && tasks.filter(m => m.id !== req.params.id);
    res.send(tasks);
}

export const updateTask = (req, res) => {
    const {id, name, viewed, description, status} = req.body;
    console.log(`id`, id);
    let task = tasks && tasks.filter(m => m.id == id)[0];
    console.log(`task`, task);
    if (task && task.name) {
        task.name = name;
        task.viewed = viewed;
        task.description = description;
        task.status = status;
    }
    console.log(`task`, task);
    let newTasks = tasks && tasks.filter(m => m.id !== req.params.id);
    newTasks.push(task);
    console.log(`newTasks`, newTasks);
    res.send(newTasks);
}

