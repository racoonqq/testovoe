import express from "express";
import TaskController from "../controllers/controller.tasks.js";

const router = express.Router();
const taskController = new TaskController();

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTasks);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;