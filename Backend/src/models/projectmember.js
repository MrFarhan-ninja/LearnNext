import mongoose,{Schema} from 'mongoose'

const projectMemberSchema = new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    project:{
        type:Schema.Types.ObjectId,
        ref:"project"
    },
    role:{
        type:String,
        enum:["ADMIN","PROJECTADMIN","MEMBER"],
        default:"MEMBER"
    }

})


const projectmember = mongoose.model("projectmember",projectMemberSchema)
export default projectmember