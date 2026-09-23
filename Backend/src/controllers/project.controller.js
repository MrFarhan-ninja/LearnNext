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

const getProject = async(req,res)=>{

    const project = await Project.find()
    console.log(project)
    
    if(!project){
         return res.status(400).json({
            success:false,
            message:"No Projects were found"
        })

    }

    console.log(project)
    project.map((val)=>{
    
       const data=`Project Name - ${val.title}`
       console.log(data)

       res.status(201).json({
            success:true,
            data:{
                ProjectName : data
            },
            //message:"All projects"
        })
        
    })

    // const allProjects = data

    //   res.status(201).json({
    //         success:true,
    //         data:{
    //             ProjectName : allProjects
    //         },
            //message:"All projects"
      //  })

    console.log(project)

    // res.status(201).json({
    //     success:true,
    //     message:"All projects",
        
    // })

}


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

// const deleteProject = async(req,res)=>{

// }

export {
    createProject,
    getProject,
    getOneProject
}