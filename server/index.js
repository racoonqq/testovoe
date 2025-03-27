import express from "express";
import router from "./routes/tasks.js";
import auth from "./routes/auth.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(cookieParser());

import path from "path";
app.use(express.static(path.join(path.resolve(), "../client")));

app.use("/api/tasks", router);
app.use("/api", auth);

app.get("/dashboard", (req, res) => {
        try {
            const token = req.cookies.refreshToken;
            const decoded = jwt.verify(token, "secret");
            if (!decoded || !decoded.userId) {
                throw new Error("Invalid token");
            }
            
            res.sendFile(path.join(path.resolve(), "../client/dashboard.html"))
        } catch (error) {
            res.clearCookie("refreshToken");
            res.redirect("/auth.html");
            return;
        }
});
app.listen(3000, () => {
    console.log("Server started on port 3000");
})