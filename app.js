const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const ejs = require("ejs")
const ejsLayout = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const morgan = require("morgan") // morgan for login
const passport = require("passport")
const session = require("express-session")
const mongoStore = require("connect-mongo")(session)
const connectDB = require("./config/db")


//loading config file

dotenv.config({path:"./config/config.env"})

//passport config
require("./config/passport")(passport)


connectDB()

const app = express()


//login
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

//template and layouts
app.use(ejsLayout)
app.set("layout","./layouts/main")//changing default layouts
app.set('view engine', 'ejs')

//sessions
app.use(session({
  secret: 'smelly cat',
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: mongoose.connection})
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//loading statics
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))


//Routes
app.use("/",require("./routes/index"))
app.use("/auth",require("./routes/auth"))
app.use("/thoughts",require("./routes/thoughts"))




const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
