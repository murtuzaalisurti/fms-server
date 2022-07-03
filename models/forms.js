const { nanoid } = require('nanoid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    qID: {
        type: String,
        required: true
    },
    resText: {
        type: String,
        required: true
    },
    resType: {
        type: String,
        required: true
    }
})

const questionSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    QuestionText: {
        type: String,
        required: true
    },
    Option: {
        type: mongoose.SchemaTypes.Array,
        required: true
    },
    responses: [responseSchema]
})

const formSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: nanoid(20)
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    questions: [questionSchema]
})

// const allFormsSchema = new Schema({
//     forms: [formSchema]
// })

const Form = mongoose.model('Form', formSchema) // will look for forms collection in mongodb
module.exports = Form