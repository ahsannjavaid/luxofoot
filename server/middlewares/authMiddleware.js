import JWT from 'jsonwebtoken'
import adminSchema from "../models/adminSchema.js";

export const requireSignIn = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode
        if (decode) next()
        else {
            res.status(401).send({
                success: false,
                message: "Invalid token!"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Session has expired. Please login again."
        })
    }
}

export const requireAdminPrivilege = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        if (!decode) {
            res.status(401).send({
                success: false,
                message: "Invalid token!"
            })
        }
        // verify if the request is from admin
        const adminExists = await adminSchema.findById(req.user._id);
        if (!adminExists) {
            return res.status(403).send({
                success: false,
                message: "Invalid access!"
            });
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Session has expired. Please login again."
        })
    }
}