import { isLoggedIn } from "../middleware/auth.middleware.js"
import Project from "../models/project.model.js"

const createProject = async(req,res)=>{
    const {title,description} = req.body

    if(!title || !description){
        return res.status(404),json({
            success:false,
            message:"Enter the required data"
        })
    }

    const project = await Project.create({
        title,
        description,
        createdBy:req.user.id
    })

     res.status(201).json({
        success:true,
        mesaage:"Project created Successfully",
        project
     })

}

export {
    createProject
}