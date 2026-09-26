import subTaskModel from "../models/subtask.model.js"
import Task from "../models/task.model.js"

const createSubTask = async(req,res)=>{

    const {title,taskDescription,taskReference,status} = req.body
    const id = req.user.id

    if(!id){
        return res.status(404).json({
            success:false,
            message:"Id is invalid"
        })
    }

    if(!title || !taskDescription || taskReference || status){
        return res.status(404).json({
            success:false,
            message:"All fields must be required"
        })
    }

    const task = await Task.findOne({title:taskReference})

    if(!task){
        return res.status(404).json({
            success:false,
            message:"task not found"
        })
    }

    const user = await findById(id)

      if(!task){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }

    const subTask = await subTaskModel.create({
        title,
        taskDescription,
        taskReference:task._id,
        createdBy:user._id,
        status
    })

    res.status(200).json({
        success:true,
        message:"SubTask created Successfully",
        data:{
            subTask   
        }
    })


 }
const deleteSubTask = async(req,res)=>{
    const id = req.params.subTaskid

     if(!id){
       return res.status(404).json({ 
        success:false,
        message:"Project Id not found for this task"
    })
  }

    const deleteSubTask = await Task.findByIdAndDelete(id)

     if(!deleteSubTask){
       return res.status(404).json({ 
        success:false,
        message:"Tasks for this project not found"
    })
  }

  res.status(200).json({
    success:true,
    message:"Deleted Project Successfully",
    deleteSubTask
  }
)

    
}

const updateSubTask = async(req,res)=>{
    const id = req.params.taskid

    const {title, taskDescription} = req.body

    if(!title || !taskDescription){
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
 const updateSubTask = await Task.findByIdAndUpdate(
    id,
    {
        title,
        taskDescription
    },
    {
        returnDocument:"after"
    }
)
    res.status(200).json({
        success:true,
        message:"Task Updated successfully",
        updateSubTask
    })


}

const getSubTask = async(req,res)=>{

    const id = req.params.taskid
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


    const Subtasks = await subTaskModel.find({taskReference:id})
    console.log(Subtasks)

    if(!Subtasks){
       return res.status(404).json({ 
        success:false,
        message:"Tasks for this project not found"
    })
  }

  res.status(201).json({
    success:true,
    message:"Project tasks",
    data:{
        Subtasks
    }
  })
}

const updateSubTaskStatus = async (req ,res) => {
    const {status} = req.body
    const id = req.params.subTaskid

    if(!id){
        return res.status(404).json({
            success : false,
            message : "Task Id not found for task!"
        })
    }

    const subtask = await subTaskModel.findById(id)

    if(!subtask){
        return res.status(404).json({
            success : false,
            message : "task not found!"
        })
    }

    subtask.status = status

    await subtask.save()

    res.status(200).json({
        success : true,
        message : "Task Updated Successfully!",
        data : {
            subtask
        }
    })
}

export {
    createSubTask,
    deleteSubTask,
    updateSubTask,
    getSubTask,
    updateSubTaskStatus
}