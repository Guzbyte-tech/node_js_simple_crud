const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const blogRouter = require('./routes/blog')
const { render } = require('ejs');
const dotenv = require("dotenv").config();
const app = express();

const DBURI = process.env.DBURI;
// mongoose.connect(DBURI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(DBURI)
    .then((result) => app.listen(process.env.APPLICATION_PORT))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
// app.set('views', 'views');

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.redirect('/blogs');
});


app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
});

//Blog Routes
app.use('/blogs', blogRouter)

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})