import {Router} from 'express'

import { addProjectMember, deleteMember, getMemberByProject } from '../controllers/projectmember.controller.js'
const projectMember = Router()

projectMember.route("/addmember").post(addProjectMember)
projectMember.route("/delete-member").get(deleteMember)
projectMember.route("/get-members").get(getMemberByProject)


export default projectMember