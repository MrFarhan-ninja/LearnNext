import {Router} from "express"

import { createSubTask, deleteSubTask, updateSubTask,getSubTask,updateSubTaskStatus } from "../controllers/subTask.controller.js"
import { isLoggedIn } from "../middleware/auth.middleware.js"

const subTaskRoute = Router()


subTaskRoute.route("/create-subtask").post(isLoggedIn,createSubTask)

subTaskRoute.route("/update-subtask/:subTaskid").post(updateSubTask)

subTaskRoute.route("/delete-subtask/:taskid").get(deleteSubTask)

subTaskRoute.route("/get-subtask/:taskid").get(getSubTask)

subTaskRoute.route("/update-subtask/:subTaskid").post(updateSubTaskStatus)



export default subTaskRoute