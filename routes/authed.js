//Third party packeges
const express = require('express');
const router = express.Router();

const isAuth = (req, res, next) => {
    try {
        if (!req.session.authorization) res.sendFile(path.join(__dirname, "..", "client/build", "index.html"));
        else next();
    } catch (error) {
        return res.send({ status: true, message: 'your session is not valid', data: error })
    }
}

router.post('/authed', isAuth, (req, res) => {
    try {
        res.send(
            {
                success: true,
                message: 'Your session is valid'
            });
    }
    catch (err) {
        res.send(err)
    }
})

module.exports = router;