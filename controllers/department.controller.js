const db = require('../models');
const Department = db.Department;

exports.create = (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    if (!name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }
    const newDepartment = {
        name: name,
        description: description,
    };
    Department.create(newDepartment).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating new department."
        });
    });
}

exports.findAll = (req, res) => {
    Department.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving departments."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Department.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find department with id ${id}`,
            });
        }
    }).catch(err => {
        res.status(500).send({
            messsage: err.message || "Some error occured while retrieving department with id " + id
        });
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const oldDepartment = Department.findByPk(id).then(data => {
        return data;
    })
    const updatedDepartment = {
        name: name ? name : oldDepartment.name,
        description: description ? description : oldDepartment.description,
    };
    Department.update(updatedDepartment, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({ message: "Department updated successfully.", updatedDepartment });
        } else {
            res.send({ message: `Cannot update department with id ${id}. Maybe department was not found or data is not supplied.` })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating department with id " + id
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Department.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Department was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete department with id ${id}. Maybe department was not found`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete department with id ${id}`
        })
    })
}