import mongoose , {Schema} from "mongoose";
import User from "./user.model.js";


const projectSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date
    }
},{timestamps:true})

const Project = mongoose.model("project",projectSchema)


export default Project