const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 1331;

var app = express();

hbs.registerPartials(__dirname + '/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(err);
    });
    next();
});

// app.use((req, res, next) => {
//     res.status(404).render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.status(200).render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'welcome..'
    });
});

app.get('/about', (req, res) => {
    res.status(200).render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.status(404).send({
        errormsg: 'Oops.. Something went bad.'
    });
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});