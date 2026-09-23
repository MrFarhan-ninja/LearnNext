import { isLoggedIn } from "../middleware/auth.middleware.js"
import Project from "../models/project.model.js"


//Create-Project API completed

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


//getAll Projects API completed
const getProject = async(req,res)=>{

    const project = await Project.find().populate("createdBy","userName")

    
    if(!project){
         return res.status(400).json({
            success:false,
            message:"No Projects were found"
        })

    }

      res.status(201).json({
            success:true,
        
            message:"All projects",
            project
       })

    console.log(project)

}


//getProjectById API completed

const getOneProject= async(req,res)=>{

    const getOneProject= req.params
    //console.log(id)
    const project = await Project.findById(getOneProject.id)


    if(!project){
        return res.status(401).json({  
             success:false,
            message:"Project NOt found"
        
        }) 
    }

    res.status(200).json({
        success:true,
        data:{
            ProjectName:project.title
        }
    })
}


// DeleteProject API completed


 const deleteProject = async(req,res)=>{

    const deleteId = req.params.id

    const project = await Project.findByIdAndDelete(deleteId)

        if(!project){
        return res.status(401).json({  
             success:false,
            message:"Project NOt found"
        
        }) 
    }

    res.status(200).json({
        success:true,
        message:"Project Deleted Successfully"
    })
}



const updateProject = async(req,res)=>{

    const id=req.params.id
    const {title,description} = req.body


    if(!title || !description){
         return res.status(401).json({  
             success:false,
            message:"Required fields"
        
        })
    }

    const updateProject = await Project.findByIdAndUpdate(
        id,
        {
            title,
            description
        },
        {
            returnDocument:"after"
        }
    )

    res.status(201).json({
        success:true,
        message:"Project updated successfulyy",
        data:{
            Project:updateProject
        }
    })


}

export {
    createProject,
    getProject,
    getOneProject,
    updateProject,
    deleteProject
}