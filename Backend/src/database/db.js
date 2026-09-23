import mongoose from 'mongoose'
import config from './config.js'

const connecttoDB = async ()=>{
    try{
    await mongoose.connect(config.MONGO_URI)
    console.log("Database connected Successfully")
    }catch(err){
        console.log("Database connection failed")
    }
}

export default connecttoDB