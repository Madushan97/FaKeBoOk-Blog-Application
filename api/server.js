const express = require('express')
const cors = require('cors')
const app = express()

const mongoose = require('mongoose')
const User = require('./models/User')
const Post = require('./models/Post')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { ok } = require('assert')
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })
// file system
const fs = require('fs')

const salt = bcrypt.genSaltSync(10);
const secret = 'qwertyuioplkjhgfdsacvzxnm'

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())

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
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            })

        })

        // res.json()
    } else {
        res.status(400).json('Invalid Credentials')
    }

})

// get profile
app.get('/profile', (req, res) => {

    // grab the token
    const { token } = req.cookies
    // read the token
    jwt.verify(token, secret, {}, (err, info) => {

        if (err) throw err;
        res.json(info);
    })
})

//  logout endpoit
app.post('/logout', (req, res) => {

    res.cookie('token', '').json('ok');
})

// create post
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath)

    const { title, summary, content } = req.body
    const postDoc = await Post.create({
        title,
        content,
        summary,
        cover: newPath,
    })

    res.json(postDoc);
})

app.listen(4000)


// 