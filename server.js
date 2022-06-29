const app = require('express')()
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const { dbConnect } = require('./db/config')
const Form = require('./models/forms')

//connecting to mongodb
dbConnect()

app.use(cors())
app.use(bodyParser.json())

app.post('/addForm', (req, res) => {
    const form = new Form({
        title: req.body.title,
        desc: req.body.desc
    })

    // console.log(form)

    form.save((err) => {
        if(err) {
            console.log(err)
            res.status(500).json({error: err})
        } else { 
            // console.log(form._id.toHexString()) 
            res.status(200).json({
                success: true,
                formId: form._id.toHexString()
            })
        }
    })  
})

app.get('/allForms', (req, res) => {
    Form.find().then((forms) => {
        res.status(200).json({
            data: forms
        })
    })
})

app.get('/addQues', (req, res) => {
    Form.findById('62bc6bb01010199b15f6c0d7').then((form) => {
        form.questions.push({
            type: 'singleChoice', // OR multipleChoice OR text
            QuestionText: 'This is question number 3',
            Option: [
                {
                    OptionText: 'Option 1'
                },
                {
                    OptionText: 'Option 2'
                }
            ]
        })

        form.save().then(() => {
            res.status(200).json({success: true})
        }).catch((err) => {
            res.status(500).json({error: err})
        })
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

app.post('/getForm', (req, res) => {
    Form.findById(req.body.formId).then((form) => {
        res.status(200).json({data: form})
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.status(200).json({message: `${req.body.message} received`})
})

app.listen(process.env.PORT, () => console.log(`server running at ${process.env.PORT}`))