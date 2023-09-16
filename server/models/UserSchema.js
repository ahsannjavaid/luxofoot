import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    securityAnswer: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model("users", userSchema)