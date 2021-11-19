const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new' , (req, res) => {
  res.render('articles/new', {article: new Article()})
});

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', {article: new Article()});
})

// router.post('/', async (req, res, next) => {
//   req.article = new Article();
//   next()
// }, saveArticleAndRediirect('new'));
router.post('/', async (req, res) => {
   let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  })
  article.save()
    console.log('saved to  database')
   return res.redirect(`/articles/${article.slug}`)
})

router.get('/:slug', async (req, res)=> {
  let article = await Article.findOne({slug: req.params.slug})
  if(article == null) {
    res.redirect('/')
  }
  return res.render('articles/show', {article: article})
})

// router.put('/:id', async (req, res, next) => {  
//   req.article = await Article.findById(req.params.id)
//   next()
// }, saveArticleAndRediirect('edit'));


router.put('/:slug', (req, res, next) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  })
  article.save()
    console.log('updated database')
   return res.redirect(`/articles/${article.slug}`)
})

router.delete('/:id', async(req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  console.log('deleted from database')
  res.redirect('/')
})

// function saveArticleAndRediirect(path) {
//   return (req, res) => {

//     let article = req.article;
//       article.title = req.body.title
//       article.description = req.body.description
//       article.markdown = req.body.markdown
  
//     try{
//        article.save()
//       console.log('articles have been sent to database')
//       res.redirect(`/articles/${article.id}`)
//     } catch (err) {
//       res.render(`articles/${path}`, {article: article})
//     }

//   }
// }

module.exports = router;