import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const db = process.env.DATABASE
mongoose.connect(db).then(() => {
    console.log("Database Connected!")
}).catch(error => {
    console.log(error)
})