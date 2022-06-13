module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const attendance = require('../../controllers/attendance.controller');

    // create new attendance
    router.post('/', attendance.create);

    // get all attendances
    router.get('/', attendance.findAll);

    // get all attendances by date and subject id
    router.post('/getbydateandsubject', attendance.findByDateAndSubject);

    // get attendance with id
    router.get('/:id', attendance.findOne);

    // update attendance
    router.put('/:id', attendance.update);

    // delete attendance
    router.delete('/:id', attendance.delete);

    app.use('/api/attendance', router);
}