module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const teacher = require('../../controllers/teacher.controller');

    // Link teacher and user
    router.post('/linkuser', teacher.LinkTeacherAndUser);

    // Get teacher by user id
    router.post('/getbyuserid', teacher.GetTeacherByUserId);

    // create new teacher
    router.post('/', teacher.create);

    // get all teachers
    router.get('/', teacher.findAll);

    // get teacher with id
    router.get('/:id', teacher.findOne);

    // update teacher
    router.put('/:id', teacher.update);

    // delete teacher
    router.delete('/:id', teacher.delete);

    app.use('/api/teacher', router);
}