import JWT from 'jsonwebtoken'

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