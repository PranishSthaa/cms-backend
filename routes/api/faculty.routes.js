module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const faculty = require('../../controllers/faculty.controller');

    // create new faculty
    router.post('/', faculty.create);

    // get all faculties
    router.get('/', faculty.findAll);

    // get faculty with id
    router.get('/:id', faculty.findOne);

    // update faculty
    router.put('/:id', faculty.update);

    // delete faculty
    router.delete('/:id', faculty.delete);

    app.use('/api/faculty', router);
}