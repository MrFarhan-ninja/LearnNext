import Project from "../models/project.model.js"
import projectNotesModel from "../models/projectnote.model.js";
import User from "../models/user.model.js";



const createNote = async(req,res)=>{

    const{notes,projectReference} = req.body

    const userid = req.user.id

      if(!notes){
        return res.status(404).json({
            success:false,
            message:"Content does not exist"
        })
    }
     if (!projectReference) {
        return res.status(400).json({
            success: false,
            message: "Project is required!",
        });
    }


    const user = await User.findById(userid)

    if(!user){
          return res.status(400).json({
            success: false,
            message: "User is required!",
        });
    }
    
    const project = await Project.findOne({projectReference})

    if(!project){
        return res.status(400).json({
            success: false,
            message: "Valid Project is required!",
        });
    }

    const Name = user.userName
    
    //projectNotesModel.createdBy = Name

    await user.save()

    const projectnotes = await projectNotesModel.create({
        notes,projectReference,createdBy:req.user.id
    })


    res.status(201).json({
    success:true,
    message:"Project Note Successfully Created",
    data:{
        projectnotes,
        Name
    }
})


    
}

const getNoteofProject = async(req,res)=>{
    const noteid = req.params.id

    const notes = await projectNotesModel.findById(noteid)

    if(!notes){
        return res.status(404).json({
            success:false,
            message:"Notes  not found"
        })
    }
    
    res.status(200).json({
    success:true,
    message:"Project Note fetched Successfully",
    data:{
        notes
    }
})



}

const deleteNote = async(req,res)=>{

const deleteid = req.params.id

const deleteNote = await projectNotesModel.findById(deleteid)

if(!deleteNote){
    return res.status(404).json({
        success:false,
        message:"Note does not exist",
    })
}

res.status(200).json({
    success:true,
    message:"Delete Project Note Successfully",
    data:{
        deleteNote
    }
})

}

// const updateNote = async(req,res)=>{
//     const id = req.params.id

//     const updateNote = await 
// }

export {
    createNote,
    getNoteofProject,
    deleteNote,
    
}



// const projectNotesSchema = new Schema(
//     {
//         notes: {
//             type: String,
//             require: true,
//         },
//         projectReference: {
//             type: Schema.Types.ObjectId,
//             ref: "projectModel",
//         },
//         createdBy: {
//             type: Schema.Types.ObjectId,
//             ref: "userModel",
//         },
//         createdOn: {
//             type: Date,
//             require: true,
//         },
//     },
//     {
//         timestamps: true,
//     }
// );