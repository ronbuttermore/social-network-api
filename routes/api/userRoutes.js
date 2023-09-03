const router = require('express').Router();
const { createUser, getUsers, getSingleUser, updateUser, deleteUser } = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).post(updateUser).delete(deleteUser);

module.exports = router;
