const express = require("express")
const router = express.Router()

const {ensureAuth} = require("../middleware/auth")

const Thought = require("../models/Thought")

//description: show add page
//route : GET /thoughts/add

router.get("/add", (req,res)=>{
  res.render("thoughts/add")
})

//description: show all thoughts
//route : GET /thoughts

router.get("/", async(req,res)=>{
    try{
      const thoughts = await Thought.find({status:"public"}).populate("user").sort({createdAt: "desc"}).lean()
      res.render("thoughts/index",{thoughts})
    }catch(e){
      console.error(e)
      res.render("error/500")
    }
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
