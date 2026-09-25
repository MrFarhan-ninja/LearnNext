import Project from "../models/project.model.js"
import User from "../models/user.model.js"
import Task from "../models/task.model.js"




const createTask = async(req,res)=>{

    const {title,description,isStatus,project,assignedBy,assignedTo} = req.body

    //const id = req.user.id

    console.log(description)

    if(!title){
        return res.status(401).json({
            success:false,
            messsage:"Title must be required"
        })
    }

    if(!description){
        return res.status(401).json({
            success:false,
            messsage:"description must be required"
        })
    }


    if(!assignedTo){
        return res.status(401).json({
            success:false,
            messsage:"description must be required"
        })
    }
    if(!assignedBy){
        return res.status(401).json({
            success:false,
            messsage:"description must be required"
        })
    }

    // if(!id){
    //     return res.status(401).json({
    //         success:false,
    //         messsage:"Invalid User"
    //     })
    // }

    const user = await User.findOne({email:assignedBy})
    console.log(user)

    if(!user){
         return res.status(401).json({
            success:false,
            messsage:"User must be required"
        })
    }

    const assignproject = await Project.findOne({title:project})
    console.log(assignproject)

    if(!assignproject){
          return res.status(401).json({
            success:false,
            messsage:"Project must be required"
        })
    }


  const assignedToUser = await User.findOne({email:assignedTo})
  console.log(assignedToUser)

  if(!assignedToUser){
    return res.status(404).json({
        success:false,
        message:'User Not found'
    })
  }

    const task = await Task.create({
        title,
        description,
        assignedTo,
        project:assignproject._id,
        assignedBy:user.id,
        assignedTo:assignedToUser.id,
        isStatus
    })


    res.status(200).json({
        success:true,
        message:"Task created Successfully"
    })







    }







export {
    createTask
}