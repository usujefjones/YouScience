import express from 'express';
const router = express.Router();
import {getTask, getTasks, createTask, deleteTask, updateTask} from '../controllers/tasks.js';

//All routes here start with /users
router.get('/', getTasks);
router.post('/', createTask)
router.get('/:id', getTask);
router.get('/delete/:id', deleteTask);
router.post('/update', updateTask);

export default router;
