import express from 'express'
import { LoginController, RegisterController, TestProtectController } from '../controllers/AuthController.js'
import { RequireSignIn } from '../middlewares/AuthMiddleware.js'

const router = express.Router()

router.post("/register", RegisterController)
router.post("/login", LoginController)
router.get("/test-protect", RequireSignIn, TestProtectController)

export default router