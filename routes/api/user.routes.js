module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const user = require('../../controllers/user.controller');
    const { authJwt } = require("../../middleware");

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content_type, Accept"
        );
        next();
    });

    // register new user
    router.post('/register', user.register);

    // login user
    router.post('/login', user.login);

    // refresh token
    router.post("/refreshtoken", user.refreshToken);

    // update password
    router.put("/changepass", user.changePassword);

    router.get("/allTest", user.allAccess);
    router.get("/userTest", [authJwt.verifyToken], user.userBoard);
    router.get("/adminTest", [authJwt.verifyToken, authJwt.isAdmin], user.adminBoard);
    router.get("/superAdminTest", [authJwt.verifyToken, authJwt.isSuperAdmin], user.superAdminBoard);

    app.use('/api/user', router);
}