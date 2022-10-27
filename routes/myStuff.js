const express = require('express');
const router = express.Router();
const homeHelpers = require('../db/queries/home');
const myStuffHelpers = require('../db/queries/myStuffHelpers');
const saveFolderQueries = require('../db/queries/saveFolder');

router.get('/', (req, res) => {
  const userLoggedIn = req.session.user_id;
  if (!userLoggedIn) {
    res.redirect('/login');
  } else {
    homeHelpers.getUserById(userLoggedIn).then(user => {
      myStuffHelpers.getFoldersByUserId(userLoggedIn).then(folders => {
        console.log(folders);
        myStuffHelpers.getPostsByUserId(userLoggedIn).then(posts => {
          console.log(posts);
          res.render('myStuff', { userLoggedIn, user, folders, posts });
        })
          .catch(error => {
            console.log(error.message);
          });
      })
        .catch(error => {
          console.log(error.message);
        });
    })
      .catch(error => {
        console.log(error.message);
      });
  }
});

router.post('/', (req, res) => {
  const newSaveFolder = {
    user_id: req.session.user_id,
    title: req.body.title
  };
  console.log('newSaveFolder', newSaveFolder);
  saveFolderQueries.createSaveFolder(newSaveFolder)
    .then((saveFolder) => {
      res.redirect(`/my-stuff`);
    });
});

module.exports = router;
