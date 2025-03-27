import express from "express";
import userService from "../services/user-service.js";

const auth = express.Router();

auth.post("/login", userService.login)
auth.post("/register", userService.registration)

export default auth;