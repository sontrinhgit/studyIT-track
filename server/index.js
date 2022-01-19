require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./router/auth')
const postRouter = require('./router/post')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-studyit.1rfw8.mongodb.net/mern-studyit?retryWrites=true&w=majority`)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()

//de express nhan duoc de lieu tra ve la json 
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)

app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server run on ${PORT} `))