module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const fee = require('../../controllers/fee.controller');

    // create new fee
    router.post('/', fee.create);

    // get all fees
    router.get('/', fee.findAll);

    // get fee with id
    router.get('/:id', fee.findOne);

    // update fee
    router.put('/:id', fee.update);

    // delete fee
    router.delete('/:id', fee.delete);

    app.use('/api/fee', router);
}