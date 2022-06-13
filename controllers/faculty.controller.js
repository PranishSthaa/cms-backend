const db = require('../models');
const Faculty = db.Faculty;

exports.create = (req, res) => {
    const name = req.body.name;
    const faculty_code = req.body.faculty_code;
    const description = req.body.description;

    if (!name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }
    const newFaculty = {
        name: name,
        faculty_code: faculty_code,
        description: description,
    };
    Faculty.create(newFaculty).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating new faculty."
        });
    });
}

exports.findAll = (req, res) => {
    Faculty.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving faculties."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Faculty.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find faculty with id ${id}`,
            });
        }
    }).catch(err => {
        res.status(500).send({
            messsage: err.message || "Some error occured while retrieving faculty with id " + id
        });
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const faculty_code = req.body.faculty_code;
    const description = req.body.description;

    const oldFaculty = Faculty.findByPk(id).then(data => {
        return data;
    })
    const updatedFaculty = {
        name: name ? name : oldFaculty.name,
        faculty_code: faculty_code ? faculty_code : oldFaculty.faculty_code,
        description: description ? description : oldFaculty.description,
    };
    Faculty.update(updatedFaculty, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({ message: "Faculty updated successfully.", updatedFaculty });
        } else {
            res.send({ message: `Cannot update faculty with id ${id}. Maybe faculty was not found or data is not supplied.` })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating faculty with id " + id
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Faculty.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Faculty was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete faculty with id ${id}. Maybe faculty was not found`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete faculty with id ${id}`
        })
    })
}