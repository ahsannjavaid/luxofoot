import JWT from 'jsonwebtoken'

export const RequireSignIn = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode
        if (decode) next()
        else {
            res.status(404).send({
                success: false,
                message: "Invalid Token!"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Something went wrong with Token!"
        })
    }
}