const { Fee, Student } = require('../models');

exports.create = (req, res) => {
    const type = req.body.type;
    const receipt_no = req.body.receipt_no;
    const date = req.body.date;
    const status = req.body.status;
    const amount = req.body.amount;
    const studentName = req.body.student;

    if (!receipt_no) {
        res.status(400).send({
            message: "Reciept Number cannot be empty!"
        });
        return;
    }
    const newFee = {
        type,
        receipt_no,
        amount,
        date,
        status
    };
    Fee.create(newFee).then(fee => {
        Student.findOne({
            where: {
                name: studentName
            }
        }).then(student => {
            fee.setStudent(student.id);
            res.send(
                {
                    message: "Successfully created fee entry.",
                    fee
                }
            );
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating new fee entry."
        });
    });
}

exports.findAll = (req, res) => {
    Fee.findAll({ include: Student }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving fees."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Fee.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find fee entry with id ${id}`,
            });
        }
    }).catch(err => {
        res.status(500).send({
            messsage: err.message || "Some error occured while retrieving fee entry with id " + id
        });
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const type = req.body.type;
    const receipt_no = req.body.receipt_no;
    const date = req.body.date;
    const status = req.body.status;
    const amount = req.body.amount;
    const studentName = req.body.student;

    const oldFee = Fee.findByPk(id).then(data => {
        return data;
    })
    const updatedFee = {
        type: type ? type : oldFee.type,
        receipt_no: receipt_no ? receipt_no : oldFee.receipt_no,
        amount: amount ? amount : oldFee.amount,
        date: date ? date : oldFee.date,
        status: status ? status : oldFee.status,
    };
    Fee.update(updatedFee, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            Fee.findOne({
                where: {
                    id: id
                }
            }).then(fee => {
                Student.findOne({
                    where: {
                        name: studentName
                    }
                }).then(student => {
                    fee.setStudent(student.id)
                    res.send({ message: "Fee updated successfully.", fee });
                })
            })
        } else {
            res.send({ message: `Cannot update fee with id ${id}. Maybe fee was not found or data is not supplied.` })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating fee with id " + id,
            err
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Fee.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Fee entry was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete fee with id ${id}. Maybe fee was not found`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete fee with id ${id}`,
            err
        })
    })
}