
import Project from "../models/project.model.js"
import projectMemberModel from "../models/projectmember.model.js"
import User from "../models/user.model.js"


//add members to the project api done

const addProjectMember = async(req,res)=>{

    const {email,role,project} = req.body

    console.log(email,role,project)


     if(!email){
        return res.status(404).json({
            success:false,
            message:"Email does not exist"
        })
    }

     if (!project) {
        return res.status(400).json({
            success: false,
            message: "Project is required!",
        });
    }


    const user = await User.findOne({email})

    if(!user){
        return res.status(409).json({
            success:false,
            message:"Email does not exist"
        })
    }

    
    
//Always pass value of the enum in the body in the postman not key value

    const creatproject = await Project.findOne({title:project})

    if(!creatproject){
        return res.status(409).json({
            success:false,
            message:"Project does not exist"
        })

    }

       const member = await projectMemberModel.create({
        user: user._id,
        project: creatproject._id,
        role: role,
    });
    



    

      return res.status(200).json({
        success: true,
        message: "Member added successfully!",
        data: {
            member,
        },
    });
};


// deleteMember from the project api done

const deleteMember = async(req,res)=>{

    const deleteid = req.params.id

    const removeMember = await projectMemberModel.findOneAndDelete(deleteid)

    if(!removeMember){
        return res.status(404).json({
            success : false,
            message : "deleted Member not found!"
        })
    }

      res.status(200).json({
        success : true,
        message : "User Delete Successfully!",
        data : {
            removeMember
       }

    })
    }
// getMembers of the project api done

const getMemberByProject = async(req,res)=>{

    const projecmembertId = req.params.id

    if(!projecmembertId){
        return res.status(404).json({
            success:false,
            message:"Id does not exist"
        })
    }

    const members = await projectMemberModel.find({project:projecmembertId})

     if(!members){
        return res.status(404).json({
            success : false,
            message : "Project not Found!"
        })
    }

        res.status(200).json({
        success : true,
        message : "Projects find Successfully!",
        data : {
            members
        }
    })
}



    




export {
    addProjectMember,
    deleteMember,
    getMemberByProject,
}