const express = require('express');
const router = express.Router();

const saveFolderQueries = require('../db/queries/saveFolder');

// COMMENTS - REST API CRUD
// Create - POST
router.post('/', (req, res) => {
  const newSaveFolder = {
    user_id: req.session.user_id,
    title: req.body.title
  };
  console.log('newSaveFolder', newSaveFolder);
  saveFolderQueries.createSaveFolder(newSaveFolder)
    .then((saveFolder) => {
      res.redirect(`/post/${req.body.post_id}`);
    });
});

//Note: the remainder of CRUD operations were added and kept as they will be worked on in the future.

//Read All - GET
router.get('/', (req, res) => {
  res.send({ message: 'hello from Read all' });
});

//Read one - GET
router.get('/:id', (req, res) => {
  console.log(req.params);
  res.send({ message: 'hello from Read one' });
});

//Update - POST
router.post('/:id', (req, res) => {
  console.log(req.params);
  res.send({ message: 'hello from Update Post' });
});

//Delete - POST
router.post('/:id/delete', (req, res) => {
  console.log(req.params);
  res.send({ message: 'hello from Delete Post' });
});

module.exports = router;
