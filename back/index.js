import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import user from './model/user.js'
import path from 'path'





dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



//mongodb connection

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('Database connected..',)
})
.catch((err)=>{
    console.log(`Databse error : ${err}`)
})


app.get('/', (req, res) => {
    user.find({})
    .then((user) => res.json(user))
    .catch((err) => res.json((err)))
});

app.get('/getuser/:id',(req,res)=>{
    const id = req.params.id;
    user.findById(id)
    .then((user) => res.json(user))
    .catch((err) => res.json((err)))
})

//update user
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    user.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
        res.status(200).json({
            status: 'success',
            data: data
        })
    })
    .catch((err) => {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    })
})

//delete user
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    user.findByIdAndDelete(id)
    .then(() => {
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        })
    })
    .catch((err) => {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    })
})



app.post('/create', (req, res) => {
 user.create(req.body)
    .then((data) => {
          res.status(201).json({
                status: 'success',
                data: data
          })
     })
     .catch((err) => {
          res.status(500).json({
                status: 'error',
                message: err.message
          })
     })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})