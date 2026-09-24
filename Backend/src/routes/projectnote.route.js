import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { createNote, deleteNote,  getSpecificNote,getProjectNotes,updateProjectNote } from "../controllers/projectnote.controller.js";

const projectnoteroute = Router()

projectnoteroute.route('/create-note').post(isLoggedIn,createNote)
projectnoteroute.route('/get-specific-note/:id').get(getSpecificNote)
projectnoteroute.route('/delete-note/:id').get(deleteNote)
projectnoteroute.route("/get-project-notes-all/:projectId").get(getProjectNotes)
projectnoteroute.route("/update-note/:id").post(updateProjectNote)
//projectnoteroute.route('/delete-note/:id').get(deleteNote)



export default projectnoteroute