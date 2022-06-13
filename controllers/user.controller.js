const { User, Role, RefreshToken } = require('../models');
const jwt = require("jsonwebtoken");
const md5 = require('md5');
const config = require("../config/auth.config");

exports.register = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password)
    }).then(user => {
        if (req.body.role) {
            Role.findOne({
                where: {
                    name: req.body.role
                }
            }).then(role => {
                user.setRole(role.id).then(() => {
                    res.send({ message: "User registered successfully", role, user });
                }).catch(err => {
                    res.status(500).send({ message: err.message });
                });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        } else {
            res.send({ message: "No role specified." })
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.login = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(async (user) => {
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        var passwordIsValid = (user.password === md5(req.body.password)) ? true : false;
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration
        });
        let refreshToken = await RefreshToken.createToken(user);
        let authorities = [];
        user.getRole().then(role => {
            authorities.push('ROLE_' + role.name.toUpperCase());
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                role: authorities,
                accessToken: token,
                refreshToken: refreshToken
            });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    if (requestToken == null) {
        return res.status(403).json({
            message: "Refresh Token is required!"
        });
    }
    try {
        let refreshToken = await RefreshToken.findOne({
            where: { token: requestToken }
        });
        console.log(refreshToken)
        if (!refreshToken) {
            res.status(403).json({
                message: "Refresh token is not in database!"
            });
            return;
        }
        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });
            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }
        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });
        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

exports.changePassword = (req, res) => {
    const userId = req.body.userId;
    const oldPass = md5(req.body.oldPass);
    const newPass = md5(req.body.newPass);

    User.findOne({ where: { id: userId } }).then(user => {
        if (user.password === oldPass) {
            const updatedUser = {
                username: user.username,
                email: user.email,
                password: newPass
            }
            User.update(updatedUser, { where: { id: userId } }).then(num => {
                if (num == 1) {
                    res.send({ message: "Password successfully updated" });
                } else {
                    res.send({ message: "Password cannot be updated" });
                }
            })
        } else {
            return res.send({ message: "Password doesn't match" });
        }
    })
}

// exports.logout = (req, res) => {
//     const { user, cookies: { auth_token: authToken } } = req;
//     if (user && authToken) {
//         await req.user.logout(authToken);
//         return res.status(204).send();
//     }
//     return res.status(400).send(
//         { errors: [{ message: 'not authenticated' }] }
//     );
// }

// exports.currentUser = (req, res) => {
//     if (req.user) {
//         return res.send(req.user);
//     }
//     res.status(404).send(
//         { errors: [{ message: 'missing auth token' }] }
//     );
// }

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.superAdminBoard = (req, res) => {
    res.status(200).send("Super Admin Content.");
};