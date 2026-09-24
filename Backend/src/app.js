import express from 'express'
import authRouter from './routes/auth.route.js'
import cookieparser from 'cookie-parser'
import projectRoute from './routes/project.route.js'
import projectMember from './routes/projectmember.route.js'
import projectnoteroute from './routes/projectnote.route.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieparser())


app.use("/api/v1/auth",authRouter)

app.use("/api/v1/user",projectRoute)

app.use("/api/v1/user",projectMember)

app.use("/api/v1/user",projectnoteroute)
export default app