const { Faculty, Student } = require('../models');

exports.create = (req, res) => {
    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    const address = req.body.address;
    const gender = req.body.gender;
    const date_of_birth = req.body.date_of_birth;
    const roll_no = req.body.roll_no;
    const image = req.body.image;
    const description = req.body.description;

    if (!name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }
    const newStudent = {
        name, contact, email, address, gender, date_of_birth, roll_no, image, description
    };
    Student.create(newStudent).then(student => {
        if (req.body.faculty) {
            Faculty.findOne({
                where: {
                    name: req.body.faculty
                }
            }).then(faculty => {
                student.setFaculty(faculty.id).then(() => {
                    res.send({ message: "Student created successfully", student });
                }).catch(err => {
                    res.status(500).send({ message: err.message });
                })
            })
        } else {
            req.status(400).send({
                message: "No faculty provided",
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating new student."
        });
    });
}

exports.findAll = (req, res) => {
    Student.findAll({
        include: Faculty
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving students."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findByPk(id, {
        include: Faculty
    }).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find student with id ${id}`,
            });
        }
    }).catch(err => {
        res.status(500).send({
            messsage: err.message || "Some error occured while retrieving student with id " + id
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
    const date_of_birth = req.body.date_of_birth;
    const roll_no = req.body.roll_no;
    const image = req.body.image;
    const description = req.body.description;
    const faculty = req.body.faculty;

    const oldStudent = Student.findByPk(id).then(data => {
        return data;
    })
    const updatedStudent = {
        name: name ? name : oldStudent.name,
        contact: contact ? contact : oldStudent.contact,
        email: email ? email : oldStudent.email,
        address: address ? address : oldStudent.address,
        gender: gender ? gender : oldStudent.gender,
        date_of_birth: date_of_birth ? date_of_birth : oldStudent.date_of_birth,
        roll_no: roll_no ? roll_no : oldStudent.roll_no,
        image: image ? image : oldStudent.image,
        description: description ? description : oldStudent.description,
    };
    Student.update(updatedStudent, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            Student.findOne({ where: { id: id } }).then(student => {
                Faculty.findOne({ where: { name: faculty } }).then(faculty => {
                    student.setFaculty(faculty.id);
                    res.send({ message: "Student updated successfully.", student });
                })
            })
        } else {
            res.send({ message: `Cannot update student with id ${id}. Maybe student was not found or data is not supplied.` })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating student with id " + id
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Student.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Student was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete student with id ${id}. Maybe student was not found`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || `Could not delete student with id ${id}`
        })
    })
}