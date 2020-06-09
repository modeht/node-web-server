const express = require('express');
const hbs = require('hbs');
var app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=>{
    var now = new Date().toString();
    var str = `${now} ${req.method} ${req.url}`;
    hbs.registerHelper('s_u', ()=> str);
    next();
})
var getCurrentYear = () => {
    return new Date().getFullYear();
}

hbs.registerHelper('scream', (text)=>{
    return text.toUpperCase();
})

app.get('/', (request, response) => {
    response.render('home.hbs',{
        pageTitle: 'Home page',
        getCurrentYear,
        welcomeMessage: "Hello from home!"
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        getCurrentYear,
    });
})
app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});