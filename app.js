const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const ejs = require("ejs")
const ejsLayout = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const morgan = require("morgan") // morgan for login
const connectDB = require("./config/db")


//loading config file

dotenv.config({path:"./config/config.env"})

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

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"public"))) //loading statics


//Routes

app.use("/",require("./routes/index"))




const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
