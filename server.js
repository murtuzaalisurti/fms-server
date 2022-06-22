const app = require('express')()
require('dotenv').config()
const { dbConnect } = require('./db/config')
const Form = require('./models/forms')

//connecting to mongodb
dbConnect()

app.get('/addForm', (req, res) => {
    const form = new Form({
        title: "form3",
        desc: "form desc3"
    })

    console.log(form)

    form.save((err) => {
        if(err) {
            console.log(err)
            res.status(500).json({error: err})
        } else { 
            console.log('saved') 
            res.status(200).json({success: true})
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
    Form.findById('62b2c3ab7fbf5ce31ad6bb05').then((form) => {
        form.questions.push({
            type: 'text',
            QuestionText: 'q2: hello',
            Option: [
                {
                    OptionText: 'hello2'
                },
                {
                    OptionText: 'hello3'
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

app.listen(process.env.PORT, () => console.log(`server running at ${process.env.PORT}`))