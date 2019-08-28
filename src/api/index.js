const Router = require('express').Router();
const User = require('../models/user').User;
const Course = require('../models/course').Course;
const Review = require('../models/review').Review;

// Get courses
Router.get('/courses', function(req, res, next) {
  Course.find({}, (error, courses) => {
    if (error) {
      res.status(500)
      res.send(`Error has occurred: ${error}`);
      return next(error)
    }
    res.status(200)
    return res.send(courses.map(course => (
      {
        _id: course._id,
        title: course.title
      }
    )))
  });
})

// Get course by ID
Router.get('/courses/:id', function(req, res, next) {
  Course.findById(req.params.id, (error, result) => {
    if (error) {
      res.status(404)
      res.send(`Review not found: ${error}`);
      return next(error)
    }
  })
  .populate(['user', {
    path:'reviews',
    populate: { path: 'user', select: 'fullName'}
  }])
  .exec(function (err, course) {
    if (err) return next(err);
    res.status(200)
    return res.send(course);
  });
})

// Create course
Router.post('/courses', function(req, res, next) {
  const course = new Course({
    user: req.body.user,
    title: req.body.title,
    description: req.body.description,
    estimatedTime: req.body.estimatedTime || null,
    materialsNeeded: req.body.materialsNeeded || null,
    steps: req.body.steps || null
  })
  course.save((error) => {
    if (error) {
      res.status(500)
      res.send(`Error has occurred: ${error}`);
      return next(error)
    }

    res.status(201);
    return res.send('Document is successfully saved.');
  })
})

// Get all users
Router.get('/users', function(req,res,next) {
  User.find({}, (error, users) => {
    if (error) {
      res.status(500)
      res.send(`Error has occurred: ${error}`);
      return next(error)
    }
    res.status(200)
    return res.send(users.map(course => (
      {
        _id: course._id,
        title: course.title
      }
    )))
  });
})


// Create User
Router.post('/users', function (req,res,next) {

  // Check password and confirm password matches
  if (req.body.password !== req.body.confirmPassword) {
    const error = 'Error has occurred: Passwords do not match'
    res.send(error);
    return next(error)
  }

  var user = new User({
    fullName: req.body.fullName,
    emailAddress: req.body.emailAddress,
    password: req.body.password
  })

  user.save((error) => {

    if (error) {
      res.status(500)
      res.send(`Error has occurred: ${error.code === 11000 ? 'A user has already registered with this email address' : error}`);
      return next(error)
    }

    res.status(201);
    return res.send('Document is successfully saved.');
  })
})


module.exports = Router