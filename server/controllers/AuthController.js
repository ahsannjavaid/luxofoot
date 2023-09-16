import UserSchema from "../models/UserSchema.js"
import { ComparePassword, HashPassword } from "../helpers/PasswordBcrypt.js"
import JWT from 'jsonwebtoken'

// register user | POST
export const RegisterController = async(req, res) => {
    try {
        const {fname, lname, email, password, securityAnswer} = req.body

        // validation
        if (!fname) return res.send({error: "First name is required!"})
        if (!lname) return res.send({error: "Last name is required!"})
        if (!email) return res.send({error: "Email is required!"})
        if (!password) return res.send({error: "Password is required!"})
        if (!securityAnswer) return res.send({error: "Security answer is required!"})

        // existing user check - from database
        const existingUser = await UserSchema.findOne({email})
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "User already exists, Login!"
            })
        }

        // hashing the password
        const hashedPassword = await HashPassword(password)

        // sending data into database
        const user = await new UserSchema({fname, lname, email, password: hashedPassword, securityAnswer}).save()

        // success in registration
        res.status(200).send({
            success: true,
            message: "User Registered Successfully!",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Something went wrong in Registrating User!",
        })
    }
}

// login user | POST
export const LoginController = async(req, res) => {
 try {
    const {email, password} = req.body

    // validation
    if (!email) return res.send({error: "Email is required!"})
    if (!password) return res.send({error: "Password is required!"})

    // finding user based on email - from database
    const user = await UserSchema.findOne({email})
    if (!user) {
        return res.status(201).send({
            success: false,
            message: "User does not exist, Register!"
        })
    }

    // comparing with hashed password
    const matched = await ComparePassword(password, user.password)
    if (!matched) {
        return res.status(201).send({
            success: false,
            message: "Incorrect Password!"
        })
    }

    // JWT
    const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})

    res.status(200).send({
        success: true,
        message: "User Login Successfully!",
        user,
        token
    })
 } catch (error) {
    console.log(error)
    res.status(400).send({
        success: false,
        message: "Something went wrong while Login!",
    })
 }   
}

// test protected route | GET
export const TestProtectController = async(req, res) => {
    res.send("Protected Route")
    // I can access all the details of user from database through req.user._id
}