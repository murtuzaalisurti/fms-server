const app = require('express')()
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const { dbConnect } = require('./db/config')
const Form = require('./models/forms')
// const { nanoid } = require('nanoid')

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

app.post('/addQues', (req, res) => {
    let que;
    const options = []
    if(req.body.question.option == undefined) {
        que = {
            type: req.body.question.type,
            QuestionText: req.body.question.QuestionText
        }
    } else {
        for(let i = 0; i < req.body.question.option.length; i++){
            options.push({
                OptionText: req.body.question.option[i].OptionText
            })
        }
        que = {
            type: req.body.question.type,
            QuestionText: req.body.question.QuestionText,
            Option: options
        }
    }

    Form.findById(req.body.formId).then((form) => {
        form.questions.push(que)

        form.save().then(() => {
            res.status(200).json({success: true})
        }).catch((err) => {
            res.status(500).json({error: err})
        })
    }).catch((err) => {
        res.status(500).json({error: err})
    })
})

app.post('/addResponse', (req, res) => {
    Form.findById(req.body.formId).then((form) => {
        for(let j = 0; j < req.body.responses.length; j++){
            let que = form.questions.id(req.body.responses[j].qID)
            que.responses.push(req.body.responses[j])
        }
        // console.log(que)

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

app.post('/formResponse', (req, res) => {
    console.log(req)
    res.status(200).json({message: `${req.body} received`})
})

app.listen(process.env.PORT, () => console.log(`server running at ${process.env.PORT}`))