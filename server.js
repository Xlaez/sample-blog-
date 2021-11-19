const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Article = require('./models/article');
const app = express();
const articleRoutes = require('./routes/articles');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  let articles = await Article.find().sort({
    createdAt: 'desc'
  })
  res.render('articles/index', {articles: articles});
})

app.use('/articles', articleRoutes);

  mongoose.connect("mongodb+srv://uty:user1uty@studentform.o0has.mongodb.net/chrisean_global?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then( result => {
    console.log('it is connected')
   app.listen(5000)
 })
  .catch( err => {
  console.log(err);
  });
