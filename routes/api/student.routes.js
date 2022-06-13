module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const student = require('../../controllers/student.controller');

    // create new student
    router.post('/', student.create);

    // get all students
    router.get('/', student.findAll);

    // get student with id
    router.get('/:id', student.findOne);

    // update student
    router.put('/:id', student.update);

    // delete student
    router.delete('/:id', student.delete);

    app.use('/api/student', router);
}