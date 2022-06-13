const { Teacher, Department } = require('../models');

exports.create = (req, res) => {
    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    const address = req.body.address;
    const gender = req.body.gender;
    const join_date = req.body.join_date;
    const image = req.body.image;
    const description = req.body.description;

    if (!name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }
    const newTeacher = {
        name, contact, email, address, gender, join_date, image, description
    };
    Teacher.create(newTeacher).then(teacher => {
        if (req.body.department) {
            Department.findOne({
                where: {
                    name: req.body.department
                }
            }).then(department => {
                teacher.setDepartment(department.id).then(() => {
                    res.send({ message: "Teacher created successfully", teacher });
                }).catch(err => {
                    res.status(500).send({ message: err.message });
                })
            })
        } else {
            res.status(400).send({ message: "No department provided." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating new teacher."
        });
    });
}

exports.LinkTeacherAndUser = (req, res) => {
    const teacherId = req.body.teacherId;
    const userId = req.body.userId;
    Teacher.findOne({ where: { id: teacherId } }).then(teacher => {
        teacher.setUser(userId).then(() => {
            res.status(200).send({ message: "Successfully Linked" });
        })
    })
}

exports.GetTeacherByUserId = (req, res) => {
    const userId = req.body.userId;
    Teacher.findOne({ where: { UserId: userId } }).then(teacher => {
        res.status(200).send(teacher);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving teacher by user id."
        });
    })
}

exports.findAll = (req, res) => {
    Teacher.findAll({
        include: Department
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving teachers."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Teacher.findByPk(id, {
        include: Department
    }).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find teacher with id ${id}`,
            });
        }
    }).catch(err => {
        res.status(500).send({
            messsage: err.message || "Some error occured while retrieving teacher with id " + id
        });
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    const address = req.body.address;
    const gender = req.body.gender;
    const join_date = req.body.join_date;
    const image = req.body.image;
    const description = req.body.description;
    const department = req.body.department;
    const oldTeacher = Teacher.findByPk(id).then(data => {
        return data;
    });

    const updatedTeacher = {
        name: name ? name : oldTeacher.name,
        contact: contact ? contact : oldTeacher.contact,
        email: email ? email : oldTeacher.email,
        address: address ? address : oldTeacher.address,
        gender: gender ? gender : oldTeacher.gender,
        join_date: join_date ? join_date : oldTeacher.join_date,
        image: image ? image : oldTeacher.image,
        description: description ? description : oldTeacher.description,
    };
    Teacher.update(updatedTeacher, {
        where: { id: id }
    }).then(data => {
        if (data == 1) {
            Teacher.findOne({
                where: {
                    id: id,
                }
            }).then(teacher => {
                Department.findOne({ where: { name: department } }).then(department => {
                    teacher.setDepartment(department.id);
                    res.send({
                        message: "Successfully updated teacher.",
                        teacher
                    });
                })
            })
        } else {
            res.send({
                message: `Cannot update teacher with id ${id}`,
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating teacher with id " + id
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Teacher.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Teacher was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete teacher with id ${id}. Maybe teacher was not found`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || `Could not delete teacher with id ${id}`
        })
    })
}