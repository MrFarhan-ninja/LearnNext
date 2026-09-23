import {Router} from 'express'

import { createProject } from '../controllers/project.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js'

const projectRoute = Router()

projectRoute.route('/project').post(isLoggedIn,createProject)

export default projectRoute