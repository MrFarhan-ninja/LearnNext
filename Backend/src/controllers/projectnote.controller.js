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
    //console.log(projectReference)
    const project = await Project.findOne({title:projectReference})

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
        notes,projectReference:project._id,createdBy:userid
    })
    console.log(projectnotes)


    res.status(201).json({
    success:true,
    message:"Project Note Successfully Created",
    data:{
        projectnotes,
        Name
    }
})


}

const getSpecificNote = async(req,res)=>{
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

const deleteNote = await projectNotesModel.findByIdAndDelete(deleteid)

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


const updateProjectNote = async (req, res) => {
    const { id } = req.params;
    const { notes } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
        id,
        {
            notes
        },
        {
            new: true
        }
    );

    if (!updatedProject) {
        return res.status(404).json({
            success: false,
            message: "Project not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: updatedProject
    });
};



const getProjectNotes = async (req, res) => {

    const { id } = req.params;

    const notes = await projectNotesModel.find({
        projectReference: id
    });

    if (notes.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No notes found for this project"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Project notes fetched successfully",
        data: {
            notes
        }
    });
};

export {
    createNote,
    getSpecificNote,
    deleteNote,
    updateProjectNote,
    getProjectNotes
    
}



