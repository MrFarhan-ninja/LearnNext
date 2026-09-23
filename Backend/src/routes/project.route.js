import {Router} from 'express'

import { createProject,getProject,getOneProject, updateProject, deleteProject } from '../controllers/project.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js'

const projectRoute = Router()

projectRoute.route('/project').post(isLoggedIn,createProject)
projectRoute.route("/getProject").get(getProject)
projectRoute.route("/getProjectOne/:id").get(getOneProject)
projectRoute.route("/updateproject/:id").post(isLoggedIn,updateProject)
projectRoute.route("/delete/:id").get(isLoggedIn,deleteProject)

export default projectRoute