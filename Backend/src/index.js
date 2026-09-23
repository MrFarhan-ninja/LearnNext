import app from "./app.js";
import config from "./database/config.js";
import connecttoDB from "./database/db.js";

const port = config.PORT

await connecttoDB()

app.listen(port,()=>{
    console.log(`Server is runnign on ${port}`)
})