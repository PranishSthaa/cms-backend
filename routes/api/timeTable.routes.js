module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const timeTable = require('../../controllers/timeTable.controller');

    // create new time table
    router.post('/', timeTable.create);

    // get all time tables
    router.get('/', timeTable.findAll);

    // get time table with id
    router.get('/:id', timeTable.findOne);

    // update time table
    router.put('/:id', timeTable.update);

    // delete time table
    router.delete('/:id', timeTable.delete);

    app.use('/api/timetable', router);
}