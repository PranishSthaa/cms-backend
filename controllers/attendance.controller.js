const { Attendance, Subject, Student } = require('../models');

exports.create = (req, res) => {
    const date = req.body.date;
    const status = req.body.status;
    const subjectName = req.body.subject;
    const studentName = req.body.student;

    if (!date) {
        res.status(400).send({
            message: "date cannot be empty!"
        });
        return;
    }
    const newAttendance = {
        date,
        status,
    };
    Attendance.create(newAttendance).then(attendance => {
        Subject.findOne({
            where: {
                name: subjectName
            }
        }).then(subject => {
            attendance.setSubject(subject.id);
            return Student.findOne({
                where: {
                    name: studentName,
                }
            })
        }).then(student => {
            attendance.setStudent(student.id).then(() => {
                res.send(
                    {
                        message: "Successfully created attendance.",
                        timeTable: attendance
                    }
                );
            });
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating new attendance."
        });
    });
}

exports.findAll = (req, res) => {
    Attendance.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving attendances."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Attendance.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find attendance with id ${id}`,
            });
        }
    }).catch(err => {
        res.status(500).send({
            messsage: err.message || "Some error occured while retrieving attendance with id " + id
        });
    })
}

exports.findByDateAndSubject = (req, res) => {
    const subjectId = req.body.subjectId;
    const date = req.body.date;
    Attendance.findAll({
        where: {
            SubjectId: subjectId,
            date: date
        }
    }).then(data => {
        res.send(data);
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const date = req.body.date;
    const status = req.body.status;
    const subjectName = req.body.subject;
    const studentName = req.body.student;

    const oldAttendance = Attendance.findByPk(id).then(data => {
        return data;
    })
    const updatedAttendance = {
        date: date ? date : oldAttendance.date,
        status: status ? status : oldAttendance.status,
    };
    Attendance.update(updatedAttendance, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            Attendance.findOne({
                where: {
                    id: id
                }
            }).then(attendance => {
                Subject.findOne({
                    where: {
                        name: subjectName
                    }
                }).then(subject => {
                    attendance.setSubject(subject.id);
                    return Student.findOne({
                        where: {
                            name: studentName
                        }
                    })
                }).then(student => {
                    attendance.setStudent(student.id);
                    res.send({ message: "Attendance updated successfully.", attendance });
                })
            })
        } else {
            res.send({ message: `Cannot update attendance with id ${id}. Maybe attendance was not found or data is not supplied.` })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating attendance with id " + id,
            err
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Attendance.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "attendance was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete attendance with id ${id}. Maybe attendance was not found`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete attendance with id ${id}`,
            err
        })
    })
}