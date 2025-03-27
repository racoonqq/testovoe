import db from "../database.js";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";

class UserService {
    async registration(req, res) {
        try {
            let userId = v4();
            console.log(req.body)
            db.users.run('INSERT INTO users (userId, password, status) VALUES (?, ?, ?)', [userId, req.body.password, req.body.role]);
            const token = jwt.sign({ userId: userId, role : req.body.role }, 'secret');
            res.cookie("refreshToken", token, { maxAge : 30 * 24 * 60 * 60 * 1000, httpOnly : true});
            res.json({ token }).status(200);
        } catch(e) {
            console.log(e)
            throw new Error('Error creating user');
        }
    }

    async login(req, res) {
        const { password } = req.body;
    
        db.users.get("SELECT * FROM users WHERE password = ?", [password], (err, user) => {

        if (password == user.password) {
            const token = jwt.sign({ userId: user.userId, role : user.status }, 'secret');
            db.tokens.run('INSERT INTO tokens (userId, refreshToken) VALUES (?, ?)', [user.userId, token]);
            res.cookie("refreshToken", token, { maxAge : 30 * 24 * 60 * 60 * 1000, httpOnly : true})
            res.json({ token }).status(200)
        } else {
            res.sendStatus(301)
        }
    });
    }
}

export default new UserService();