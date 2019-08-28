'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CourseSchema = new Schema ({
    _id: ObjectId,
    user: {
        type: ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    estimatedTime: String,
    materialsNeeded: String,
    steps: [
        {
            stepNumber: Number
        },
        {
            title: {
                type: String,
                required: true
            }
        },
        {
            description: {
                type: String,
                required: true
            }
        },
    ],
    reviews: [{
        type: ObjectId,
        ref: 'Review'
    }]
});

module.exports.Course= mongoose.model('Course', CourseSchema)