const express = require('express');
const router = express.Router();

//.controllers/users
const {handleGetAllUsers, handleGetAllUsersHtml, handleFindParticularUser,handleFindParticularUserHtml,handleInsertUser,handleUpdateUser,handleDeleteUser}=require('../controllers/user');

//GET Method
//To display all users data
router.get('/api/sa_users', handleGetAllUsers);
//HTML format
router.get('/sa_users', handleGetAllUsersHtml);

//Show particular user with id
router.get('/api/:email', handleFindParticularUser);

//Html format
router.get('/:email', handleFindParticularUserHtml);

//POST Method
router.post('/', handleInsertUser);

//PATCH Method
router.patch('/:email', handleUpdateUser);

//DELETE Method
router.delete('/:email', handleDeleteUser);

module.exports=router;
