const express = require('express');
const router = express.Router();
const homeHelpers = require('../db/queries/home');
const savePostHelpers = require('../db/queries/savePost');
const folderFinderHelper = require('../db/queries/myStuffHelpers');

router.get('/', (req, res) => {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }
  return res.redirect('/my-stuff');
});

router.get('/:id', (req, res) => {
  const userLoggedIn = req.session.user_id;
  const id = req.params.id;
  if (!userLoggedIn) {
    return res.redirect('/login');
  }
  folderFinderHelper.getFolderByFolderId(id).then(folder => {
    Promise.all([homeHelpers.getUserById(userLoggedIn), savePostHelpers.getSavedPostsByFolderId(id)]).then(results => {
      const user = results[0];
      const savedPosts = results[1];
      const postIds = [];
      if (!folder) {
        return res.render('./errors/folderDNE', { userLoggedIn, id, user });
      }
      if (folder.user_id !== userLoggedIn) {
        return res.render('./errors/folderNoAccess', { userLoggedIn, id, user });
      }
      if (savedPosts.length !== 0) {
        for (const savedPost of savedPosts) {
          postIds.push(savedPost.post_id);
        }
        savePostHelpers.getAllPostsInfoThatAreSaved(postIds).then(posts => {
          const templateVars = {
            folder,
            userLoggedIn,
            user,
            posts,
            savedPosts
          };
          return res.render('folder', templateVars);
        })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        return res.render('folder', { folder, userLoggedIn, user, savedPosts });
      }
    });
  })
    .catch(error => {
      console.log(error.message);
    });
});

module.exports = router;
