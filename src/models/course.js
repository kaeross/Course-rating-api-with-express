'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CourseSchema = new Schema ({
    user: {
        type: ObjectId
    },
    title: { 
        type: String,
        required: true
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
    reviews: [ObjectId]
});

module.exports.Course= mongoose.model('Course', CourseSchema)