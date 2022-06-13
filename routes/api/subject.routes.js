module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const subject = require('../../controllers/subject.controller');

    // create new subject
    router.post('/', subject.create);

    // get all subjects
    router.get('/', subject.findAll);

    // get all subjects of teacher
    router.post('/teacher', subject.findAllByTeacher);

    // get subject with id
    router.get('/:id', subject.findOne);

    // update subject
    router.put('/:id', subject.update);

    // delete subject
    router.delete('/:id', subject.delete);

    app.use('/api/subject', router);
}