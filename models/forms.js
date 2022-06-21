const nanoid = require('nanoid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    QID: {
        type: String,
        required: true
    },
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
    }
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

const allFormsSchema = new Schema({
    forms: [formSchema]
})

const Forms = mongoose.model('Form', allFormsSchema) // will look for forms collection in mongodb
module.exports = Forms