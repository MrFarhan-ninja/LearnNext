import {Router} from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { createTask } from "../controllers/task.controller.js";

const taskRoute = Router()


taskRoute.route('/create-task').post(createTask)


export default taskRoute