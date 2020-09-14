const express = require("express")
const router = express.Router()

const {ensureAuth} = require("../middleware/auth")

const Thought = require("../models/Thought")

//description: show add page
//route : GET /thoughts/add

router.get("/add", (req,res)=>{
  res.render("thoughts/add")
})

//description: add from
//route : POST /thoughts

router.post("/", async (req,res)=>{

  try {
    req.body.user = req.user.id
    await Thought.create(req.body)
    res.redirect("/dashboard")

  } catch (e) {
    console.error(e)
    res.render("error/500")
  }
})



module.exports = router
