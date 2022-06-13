module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const userManagement = require('../../controllers/userManagement.controller');
    const user = require('../../controllers/user.controller');

    // create new user
    router.post('/', user.register);

    // get all users
    router.get('/', userManagement.findAll);

    // get user with id
    router.get('/:id', userManagement.findOne);

    // update user
    // router.put('/:id', userManagement.update);

    // delete user
    router.delete('/:id', userManagement.delete);

    app.use('/api/usermanagement', router);
}