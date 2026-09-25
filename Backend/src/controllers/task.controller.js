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

const getTaskByProject = async(req,res)=>{

    const id = req.params.projectid
     if(!id){
       return res.status(404).json({ 
        success:false,
        message:"Project Id not found for this task"
    })
  }


//     const project = await Project.find)
   
//     if(!project){
//        return res.status(404).json({
//          success:false,
//         message:"Project not found"
//     })
//   }


    const tasks = await Task.find({project:id})
    console.log(tasks)

    if(!tasks){
       return res.status(404).json({ 
        success:false,
        message:"Tasks for this project not found"
    })
  }

  res.status(201).json({
    success:true,
    message:"Project tasks",
    data:{
        tasks
    }
  })
}


const deleteTask = async(req,res)=>{
    const id = req.params.taskid

     if(!id){
       return res.status(404).json({ 
        success:false,
        message:"Project Id not found for this task"
    })
  }

    const deleteTask = await Task.findByIdAndDelete(id)

     if(!deleteTask){
       return res.status(404).json({ 
        success:false,
        message:"Tasks for this project not found"
    })
  }

  res.status(200).json({
    success:true,
    message:"Deleted Project Successfully",
    deleteTask
  }
)

    
}



const updateTask = async(req,res)=>{
    const id = req.params.taskid

    const {title,description} = req.body

    if(!title || !description){
        return res.status(404).json({
            success:false,
            message:"Requried fields are required"
        })
    }

     if(!id){
       return res.status(404).json({ 
        success:false,
        message:"Project Id not found for this task"
    })

 }
 const updateTask = await Task.findByIdAndUpdate(
    id,
    {
        title,
        description
    },
    {
        returnDocument:"after"
    }
)
    res.status(200).json({
        success:true,
        message:"Task Updated successfully",
        updateTask
    })


}




const updateTaskStatus = async (req ,res) => {
    const {status} = req.body
    const id = req.params.id

    if(!id){
        return res.status(404).json({
            success : false,
            message : "Task Id not found for task!"
        })
    }

    const task = await Task.findById(id)

    if(!task){
        return res.status(404).json({
            success : false,
            message : "task not found!"
        })
    }

    task.status = status

    await task.save()

    res.status(200).json({
        success : true,
        message : "Task Updated Successfully!",
        data : {
            task
        }
    })
}




export {
    createTask,
    getTaskByProject,
    deleteTask,
    updateTask,
    updateTaskStatus
}