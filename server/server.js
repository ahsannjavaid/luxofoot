import express from 'express'
import HomeRoute from './routes/HomeRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import './database/config.js'

const app = express()
const PORT = 5000

// body parser
app.use(express.json())

// APIs
app.use("/api/v1", HomeRoute)
app.use("/api/v1/auth", AuthRoute)

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}.`)
})