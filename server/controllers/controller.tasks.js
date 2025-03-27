import taskService from "../services/service.tasks.js";

export default class TaskController {
    async createTask(req, res) {
        try {
            const task = await taskService.createTask(req.body, req.cookies.refreshToken);
            res.status(201).json(task);
        } catch (error) {
            console.log(error)
            res.status(500);
        }
    }
    
    async getTasks(req, res) {
        try {
            let id = req.params.id ?? null;
            let userId = req.cookies.refreshToken;
            const tasks = await taskService.getTasks(userId, id);
            console.log(tasks)
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateTask(req, res) {
        try {
            const taskId = req.params.id;
            const { title, description, status } = req.body;
            const task = await taskService.updateTask(taskId, { title, description, status });
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteTask(req, res) {
        try {
            const taskId = req.params.id;
            await taskService.deleteTask(taskId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}