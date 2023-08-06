var mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const app = express()
const port = 80


// Connecting Mongoose server to NodeJS
mongoose
    .connect('mongodb://127.0.0.1:27017/contactdance')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo Eror", err))


// Defining schema for Database
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
});


// Creating Model
const Contact = mongoose.model('Contact', contactSchema);


app.use(express.urlencoded({ extended: false }))// For receiving input data
app.use('/static', express.static('static')) // For serving static files
app.set('view engine', 'pug') // For setting 'Pug' as the template engine
app.set('views', path.join(__dirname, 'views')) // For setting the views directory


// Endpoints
app.get('/', (req, res) => {
    res.status(200).render('index.pug');
})

app.get('/AboutUs', (req, res) => {
    res.status(200).render('AboutUs.pug');
})

app.get('/OurServices', (req, res) => {
    res.status(200).render('OurServices.pug');
})

app.post('/', async (req, res) => {
    var myData = new Contact(req.body);
    await myData.save().then(() => {
        res.render('index.pug')
    }).catch(() => {
        res.send("Item not saved")
    })
})


//Starting server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});