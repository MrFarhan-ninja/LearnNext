import mongoose,{Schema} from 'mongoose'
import {UserRoleEnum , AvailableUserRoles} from "../utils/constant.js"

const projectMemberSchema = new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    project:{
        type:Schema.Types.ObjectId,
        ref:"project"
    },
    role : {
        type : String,
        enum : AvailableUserRoles,
        default : UserRoleEnum.MEMBER
    }

},{
    timestamps:true
})


const projectMemberModel = mongoose.model("projectmember",projectMemberSchema)
export default projectMemberModel