const express = require("express")
const router = express.Router()

//description: login/landing page
//route : GET /

router.get("/",(req,res)=>{
  res.render("Login")
})

//description: dashboard
//route : GET / dashboard

router.get("/dashboard",(req,res)=>{
  res.render("Dashboard")
})

module.exports = router
