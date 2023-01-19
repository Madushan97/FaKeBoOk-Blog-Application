const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(10);
const secret = 'qwertyuioplkjhgfdsacvzxnm'

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://root:root@cluster0.6skwoja.mongodb.net/?retryWrites=true&w=majority')

// register endpoint
app.post('/register', async (req, res) => {

    const { username, password } = req.body;
    try {

        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc);

    } catch (e) {
        res.status(400).json(e);
    }
})

// login endpoint

app.post('/login', async (req, res) => {

    const { username, password } = req.body;
    const userDoc = await User.findOne({ username })
    // to compare password
    const isCompared = bcrypt.compareSync(password, userDoc.password);

    if (isCompared) {

        //logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {

            if (err) throw err;
            res.cookie('token', token).json('ok')

        })

        // res.json()
    } else {
        res.status(400).json('Invalid Credentials')
    }

})

app.listen(4000)


// 