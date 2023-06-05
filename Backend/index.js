const express = require("express")
const Connection = require("./config/db")
const auth = require("./middlewares/auth.middleware")
const NotesRouter = require("./routes/notes.route")
const userRouter = require("./routes/user.routes")
const cors = require("cors")
const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())

app.use("/users", userRouter)

app.use(auth)
app.use("/notes", NotesRouter)

app.listen(process.env.port, async () => {
    try {
        await Connection
        console.log("Connected to Database")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Server running at port ${process.env.port}`)
})