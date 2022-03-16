const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const quickSort = require('./quickSort')
const req = require("express/lib/request")

const app = express()

const PORT = 3000

MongoClient.connect('mongodb+srv://rosskeithbaker:mission1234@cluster0.ivupz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true})
        .then(client => {
        console.log('Connected to Database')
        const db = client.db('FurAndFleas')
        const collection = db.collection('Products')

        app.set('view engine', 'ejs')

        app.use(express.static('public'))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        
        // CREATE
        app.post('/products', (req, res) => {
            collection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
                console.log(result)
            })
            .catch(error => console.error(error))
        })

        // READ
        app.get('/', (req, res) => {
            db.collection('Products').find().toArray()
            .then(results => {

                let sortedArray = quickSort(results)

                res.render('index.ejs', { products: sortedArray })
            })
            .catch(error => console.error(error))
        })

        // UPDATE
        app.put('/products', (req, res) => {
            collection.findOneAndUpdate(
                { name: 'Birdy' },
                {
                    $set: {
                        name: req.body.name,
                        quantity: req.body.quantity
                    }
                },
                {
                    upsert: true
                }
            )
            .then(result => {
                res.json('Success')
            })
            .catch(error => console.error(error))
        })

        // DELETE
        app.delete('/products', (req, res) => {
            collection.deleteOne(
                { name: req.body.name }
            )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No product to delete')
                }
                res.json(`Deleted product`)
            })
            .catch(error => console.error(error))
        })


        app.listen(PORT, function() {
            console.log(`Server is running on ${PORT}`)
        })

    })
    .catch(error => console.error(error))

