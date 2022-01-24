const express = require('express')
const app = express()
const fs= require('fs')
const {uuid} = require('uuidv4');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const isLoggedIn = require('./middleware/authMiddleware')

app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', './public/views')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/', (req,res)=>{
    res.render('main', {
        pageTitle: "Main Page",
        cssStyle:null
    })
})

app.get('/signup', (req,res)=>{
    const data = fs.readFileSync('./data/data.json','utf-8')
    const dataParsed = JSON.parse(data)
    res.render('signup', {
        pageTitle: "Sign Up",
        cssStyle:"/css/signupStyle.css"
    })
})

app.post('/signup', (req,res)=>{
    const { username , email, password }=req.body
    console.log(password)
    const data = fs.readFileSync('./data/data.json','utf-8')
    const dataParsed = JSON.parse(data)
    const hashedPassword = bcrypt.hashSync(password.trim(), 10)
    const newData = {
        id : uuid(),
        username,
        email,
        hashedPassword
    }
    dataParsed.push(newData)
        fs.writeFileSync('./data/data.json', JSON.stringify(dataParsed) )
    res.redirect('/')
})

app.get('/login', (req,res)=>{
    res.render('login', {
        pageTitle: "LOGIN",
        cssStyle:"/css/signupStyle.css"
    })
})



app.post('/login', (req,res)=>{
    const { username , password }=req.body
    console.log(password)
    const data = JSON.parse(fs.readFileSync('./data/data.json','utf-8'))
    const userMatch = data.find((item)=> item.username == username)
    const hashedPassword = bcrypt.hashSync(password.trim(), 10)
    if(!userMatch){
            res.redirect('/login?status=usernotfound')
        }
    else{
        if(hashedPassword === userMatch.hashedPassword){
            const token = jwt.sign({
                username : userMatch.username,
                id: userMatch.id}, '123', {
                    expiresIn : 60 * 60 *24
                })
                res.cookie('jwt', token, { maxAge: 1000* 60 * 60 * 24})
                
                res.redirect('/')
                console.log(hashedPassword)
        }else {
            res.redirect('/login?status=wrongpassword')
        }
    }
})

app.get('/set-cookies', (req,res)=> {
    res.cookie('userId', 1)
    res.cookie('username', 'Ninda', {maxAge: 1000 * 60 * 60 * 24})
    res.json({
        message : "anda mendapat cookie"
    })
})

app.get('/get-cookies', (req,res) => {
    console.log(req.cookies)
    res.json({ cookies: req.cookies})
})




const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})