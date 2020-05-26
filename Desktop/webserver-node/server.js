const express = require ('express');
const hbs = require ('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('View engine','hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err) =>{
    if(err) {console.log('unable to append to server.log.')}
  });
  next();
})

app.use((req, res, next) =>{
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
}
  );
app.get('/', (req, res) => {

  // res.send('<h1>Hello Express!<h1>');});

  // res.send({
  //   name : "Mukesh",
  //   likes: ["watching Movies",
  //   "Eating food"]
      res.render('home.hbs',{
        pageTitle: 'Home Page',
        WelcomeMessage : 'Welcome to My Webpage',
        
      })
    
  });


app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Window',
    
  });

});
app.get('/maintenance', (req, res) => {
  res.render('maintenance.hbs',{
    pageTitle: 'Maintenance Window',
    
  });
});

app.get('/bad', (req, res) => {

  res.send({
    Error: "site cannot be reached"
  });
});

  app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
  }); 