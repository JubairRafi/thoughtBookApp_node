const mongoose = require("mongoose")

const ThoughtSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trime: true
  },
  body:{
    type:String,
    default:"public",
    enum:["public","private"]
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  createdAt:{
    type:Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("Thought",ThoughtSchema)
