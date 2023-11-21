const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        unique : true,
    },
    studentClass: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    phone: {
        type: Number,
        required: true,
    },
    studentImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var StudentModel = mongoose.model('students',studentSchema)
module.exports = StudentModel