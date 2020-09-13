const googleStrategy = require("passport-google-oauth20").Strategy
const mongoose = require("mongoose")
const User = require("../models/User")

module.exports = function(passport){
      passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        calbackURL: "/auth/google/callback"
      },
      async(accessToken, refreshToken, profile, done)=>{
        console.log(profile);
      }

  ))
}
