import db from "../database.js";
import jwt from "jsonwebtoken";

class TaskService {
    async createTask(task, token) {
        try {
            let userId = jwt.decode(token).userId
            db.tasks.run('INSERT INTO tasks (userId, title, description, status) VALUES (?, ?, ?, ?)', [userId, task.title, task.description, task.status]); 
        } catch {
            throw new Error('Error creating task');
        }
    }

    async getTasks(userId, taskId) {
        try {
            let token = jwt.decode(userId);
            userId = token.userId;

            if(taskId !== null && token.role !== "admin") {
                return new Promise((resolve, reject) => {
                db.tasks.get('SELECT * FROM tasks WHERE id = ? AND userId = ?', [taskId, userId], (err, raw) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(raw);
                    }
                });
                });
            } else {
                return new Promise((resolve, reject) => {
                    db.tasks.all('SELECT * FROM tasks WHERE userId = ? ORDER BY id DESC', [userId], (err, raw) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(raw);
                        }
                    });
                });
            }
            
        } catch (e){
            console.log(e)
            throw new Error('Error getting tasks');
        }
    }

    async updateTask(taskId, { title, description, status }) {
        try {
            db.tasks.run('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, taskId]);
        } catch {
            throw new Error('Error updating task');
        }
    }

    async deleteTask(taskId) {
        try {
            db.tasks.run('DELETE FROM tasks WHERE id = ?', [taskId]);
        } catch {
            throw new Error('Error deleting task');
        }
    }

}

export default new TaskService();