const { TimeTable, Subject } = require('../models');

exports.create = (req, res) => {
    const day = req.body.day;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const subjectName = req.body.subject;

    if (!day) {
        res.status(400).send({
            message: "day cannot be empty!"
        });
        return;
    }
    const newTimeTable = {
        day,
        start_time,
        end_time
    };
    TimeTable.create(newTimeTable).then(timeTable => {
        Subject.findOne({
            where: {
                name: subjectName
            }
        }).then(subject => {
            timeTable.setSubject(subject.id);
            res.send(
                {
                    message: "Successfully created time table.",
                    timeTable
                }
            );
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating new time table."
        });
    });
}

exports.findAll = (req, res) => {
    TimeTable.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving time tables."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    TimeTable.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find time table with id ${id}`,
            });
        }
    }).catch(err => {
        res.status(500).send({
            messsage: err.message || "Some error occured while retrieving time table with id " + id
        });
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const day = req.body.day;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const subjectName = req.body.subject;

    const oldTimeTable = TimeTable.findByPk(id).then(data => {
        return data;
    })
    const updatedTimeTable = {
        day: day ? day : oldTimeTable.day,
        start_time: start_time ? start_time : oldTimeTable.start_time,
        end_time: end_time ? end_time : oldTimeTable.end_time,
    };
    TimeTable.update(updatedTimeTable, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            TimeTable.findOne({
                where: {
                    id: id
                }
            }).then(timeTable => {
                Subject.findOne({
                    where: {
                        name: subjectName
                    }
                }).then(subject => {
                    timeTable.setSubject(subject.id)
                    res.send({ message: "time Table updated successfully.", timeTable });
                })
            })
        } else {
            res.send({ message: `Cannot update time table with id ${id}. Maybe time table was not found or data is not supplied.` })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating time table with id " + id,
            err
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    TimeTable.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Time table was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete time table with id ${id}. Maybe time table was not found`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete time table with id ${id}`,
            err
        })
    })
}