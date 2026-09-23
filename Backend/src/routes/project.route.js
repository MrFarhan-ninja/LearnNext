import {Router} from 'express'

import { createProject,getProject,getOneProject } from '../controllers/project.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js'

const projectRoute = Router()

projectRoute.route('/project').post(isLoggedIn,createProject)
projectRoute.route("/getProject").get(getProject)
projectRoute.route("/getProjectOne/:id").get(getOneProject)

export default projectRoute