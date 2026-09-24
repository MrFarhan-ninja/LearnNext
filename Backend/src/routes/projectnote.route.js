import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { createNote, deleteNote, getNoteofProject } from "../controllers/projectnote.controller.js";

const projectnoteroute = Router()

projectnoteroute.route('/create-note').post(isLoggedIn,createNote)
projectnoteroute.route('/get-note/:id').get(getNoteofProject)
projectnoteroute.route('/delete-note/:id').get(deleteNote)
//projectnoteroute.route('/delete-note/:id').get(deleteNote)



export default projectnoteroute