const express = require('express');
const { createPost } = require('../db/queries/createPost');
const router = express.Router();


router.get('/', (req, res) => {
  res.redirect('/');
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', async(req, res) => {
  try {
    const created = await createPost(req.body);
    res.json({created})
  } catch (error) {
    res.send('Something went wrong');
  }
  // res.render('');
});

router.get('/:id', (req, res) => {
  res.send(`individual post with id`);
});

router.post('/properties', (req, res) => {
  const userId = req.session.userId;
  database.addProperty({...req.body, owner_id: userId})
    .then(property => {
      res.send(property);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
});

module.exports = router;
