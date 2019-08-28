const Router = require('express').Router();
const User = require('../models/user').User;
const Course = require('../models/course').Course;
const Review = require('../models/review').Review;

Router.get('/test', function (req,res,next) {

    var Kate = new User({
        fullName: 1234,
        emailAddress: 'kross@test.com',
        password: 'password'
    })

    Kate.save((error) => {
        if (error) {
          return console.log(`Error has occurred: ${error}`);
        }
        console.log('Document is successfully saved.');
      }
    )
})


module.exports = Router