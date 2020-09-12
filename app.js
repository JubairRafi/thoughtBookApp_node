const express = require("express")
const dotenv = require("dotenv")
const ejs = require("ejs")
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

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


//Routes

app.use("/",require("./routes/index"))




const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
