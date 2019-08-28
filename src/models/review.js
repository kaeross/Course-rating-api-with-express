'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ReviewSchema = new Schema({
    _id: ObjectId,
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: String,
    postedOn: {
        type: Date,
        default: Date.now
    }
})

module.exports.Review = mongoose.model('Review', ReviewSchema)