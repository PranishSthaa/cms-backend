const { Subject, Faculty, Teacher } = require('../models');

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    Subject.create({
        name: req.body.name,
        code: req.body.code,
        credit_hour: req.body.credit_hour,
        full_marks_theory: req.body.full_marks_theory,
        pass_marks_theory: req.body.pass_marks_theory,
        full_marks_practical: req.body.full_marks_practical,
        pass_marks_practical: req.body.pass_marks_practical,
        description: req.body.description
    }).then(subject => {
        if (req.body.faculty && req.body.teacher) {
            Faculty.findOne({
                where: {
                    name: req.body.faculty
                }
            }).then(faculty => {
                subject.setFaculty(faculty.id);
                return Teacher.findOne({
                    where: {
                        name: req.body.teacher
                    }
                });
            }).then(teacher => {
                subject.setTeacher(teacher.id).then(() => {
                    res.send({ message: "Subject created successfully", subject });
                });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });

        } else {
            res.status(400).send({ message: "No faculty provided." });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating new subject."
        });
    });
}

exports.findAll = (req, res) => {
    Subject.findAll({
        include: { all: true }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving subjects."
        });
    });
}

exports.findAllByTeacher = (req, res) => {
    const teacherId = req.body.teacherId;
    Subject.findAll({
        where: {
            TeacherId: teacherId
        },
        include: { all: true }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving subjects."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Subject.findByPk(id, {
        include: { all: true }
    }).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find subject with id ${id}`,
            });
        }
    }).catch(err => {
        res.status(500).send({
            messsage: err.message || "Some error occured while retrieving subject with id " + id
        });
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const code = req.body.code;
    const credit_hour = req.body.credit_hour;
    const full_marks_theory = req.body.full_marks_theory;
    const pass_marks_theory = req.body.pass_marks_theory;
    const full_marks_practical = req.body.full_marks_practical;
    const pass_marks_practical = req.body.pass_marks_practical;
    const description = req.body.description;
    const faculty = req.body.faculty;
    const teacher = req.body.teacher;

    const oldSubject = Subject.findByPk(id).then(data => {
        return data;
    })
    const updatedSubject = {
        name: name ? name : oldSubject.name,
        code: code ? code : oldSubject.code,
        credit_hour: credit_hour ? credit_hour : oldSubject.credit_hour,
        full_marks_theory: full_marks_theory ? full_marks_theory : oldSubject.full_marks_theory,
        pass_marks_theory: pass_marks_theory ? pass_marks_theory : oldSubject.pass_marks_theory,
        full_marks_practical: full_marks_practical ? full_marks_practical : oldSubject.full_marks_practical,
        pass_marks_practical: pass_marks_practical ? pass_marks_practical : oldSubject.pass_marks_practical,
        description: description ? description : oldSubject.description,
    };
    Subject.update(updatedSubject, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            Subject.findOne({
                where: {
                    id: id,
                }
            }).then(subject => {
                Faculty.findOne({
                    where: {
                        name: faculty,
                    }
                }).then(faculty => {
                    subject.setFaculty(faculty.id);
                    return Teacher.findOne({
                        where: {
                            name: teacher
                        }
                    });
                }).then(teacher => {
                    subject.setTeacher(teacher.id)
                    res.send({
                        message: "Subject updated successfully.",
                        subject,
                    })
                })
            });
        } else {
            res.send({ message: `Cannot update subject with id ${id}. Maybe subject was not found or data is not supplied.` })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating subject with id " + id
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Subject.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Subject was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete subject with id ${id}. Maybe subject was not found`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || `Could not delete subject with id ${id}`
        })
    })
}