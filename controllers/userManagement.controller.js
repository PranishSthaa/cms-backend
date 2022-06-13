const { User, Role } = require('../models');
const md5 = require('md5');
const { Op } = require("sequelize");

exports.findAll = (req, res) => {
    User.findAll({
        where: {
            RoleId: {
                [Op.ne]: 1
            }
        },
        include: Role,
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving users."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find user with id ${id}`,
            });
        }
    }).catch(err => {
        res.status(500).send({
            messsage: err.message || "Some error occured while retrieving user with id " + id
        });
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Fee.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "User was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete user with id ${id}. Maybe user was not found`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete user with id ${id}`,
            err
        })
    })
}