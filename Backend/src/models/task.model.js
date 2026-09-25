import mongoose,{Schema} from "mongoose";
import Project from "./project.model.js";

import { AvailableTaskStatus ,TaskStatusEnum} from "../utils/constant.js";

const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    project:{
        type:Schema.Types.ObjectId,
        ref:"project"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    assignedTo:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    assignedBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    status:{
        type:String,
        enum:AvailableTaskStatus,
        default:TaskStatusEnum.TODO

    },
    attachments:{
        type:
        [
            {
                url:String,
                MimeType:String,
                size:Number
            }
        ],
        default:[]
    }
},
{
    timestamps:true
})

const Task = mongoose.model("tasks",taskSchema)

export default Task