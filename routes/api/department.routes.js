module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const department = require('../../controllers/department.controller');

    // create new department
    router.post('/', department.create);

    // get all departments
    router.get('/', department.findAll);

    // get department with id
    router.get('/:id', department.findOne);

    // update department
    router.put('/:id', department.update);

    // delete department
    router.delete('/:id', department.delete);

    app.use('/api/department', router);
}