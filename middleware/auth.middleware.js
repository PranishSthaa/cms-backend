const { User } = require('../models');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({
            message: "Unauthorized! Access Token was expired."
        });
    }
    return res.sendStatus(401).send({
        message: "Unauthorized!"
    });
}
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
}

const isSuperAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {
            if (role.name === "superAdmin") {
                next();
                return;
            }
            res.status(403).send({
                message: "Requires super admin role."
            });
            return;
        });
    });
}

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {
            if (role.name === "admin") {
                next();
                return;
            }
            res.status(403).send({
                message: "Requires admin role."
            });
            return;
        });
    });
}

const authJwt = {
    verifyToken,
    isAdmin,
    isSuperAdmin
};
module.exports = authJwt;