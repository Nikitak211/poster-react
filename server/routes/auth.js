//Third party packeges
const express = require('express');
const router = express.Router();
const bcrypt = require('Bcryptjs');
const jwt = require('jsonwebtoken');

//Local imports
const User = require('../models/User')
// const postSchema = require('../models/postSchema')


router.get('/register', async (req, res) => {
    try {
        const author = req.query.author
        const password = req.query.password
        const email = req.query.email
        const date = req.query.date
        console.log(author, password, email, date)
        let user = await User.findOne({ email })
        if (user) {
            return res.send({
                error: true,
                message: "email allready exsisting"
            })
        }

        const hashedPass = await bcrypt.hash(password, 12);
        const cryptEmail = await bcrypt.hash(email, 12);
        const randomAvatar = "https://avatars.dicebear.com/v2/avataaars/" + cryptEmail + ".svg"

        user = new User({
            author,
            password: hashedPass,
            email,
            date,
            avatar: randomAvatar
        })

        await user.save()
        res.send({
            success: true,
            message: "user has created"
        })
    } catch (error) {
        res.send({
            error: true,
            message: ["cannot complete registration"]
        })
        console.error(error)
    }
});

// router.post('/login', async (req, res) => {
//     const {
//         password,
//         email
//     } = req.body

//     User.findOne({ email })
//         .then(user => {
//             if (user) {
//                 bcrypt.compare(password, user.password, function (err, result) {
//                     if (err) {
//                         res.send({
//                             error: true,
//                             message: 'somthing went wrong'
//                         })
//                     }
//                     if (result) {

//                         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
//                         req.session.authorization = token
//                         return res.send({
//                             success: true,
//                             isAuth: 'Login successfully',
//                             data: token
//                         })
//                     } else {
//                         return res.send({
//                             error: true,
//                             message: 'email/password is incorrect'
//                         });
//                     }
//                 })
//             } else {
//                 res.send({
//                     error: true,
//                     message: "email/password is incorrect"
//                 })
//             }
//         }).catch((error) => {
//             console.error(error)
//         })
// });

// router.post('/logout', (req, res) => {

//     req.session.destroy((error) => {
//         if (!error) {
//             res.send({
//                 success: true,
//                 message: "Logged out."
//             })
//         }
//         if (error) {
//             res.send({
//                 error: true,
//                 message: 'an error has been encountered'
//             })
//         };
//     })
// })

// router.post('/post', async (req, res) => {
//     try {
//         const {
//             title,
//             content
//         } = req.body

//         const token = req.session.authorization;
//         if (token) {
//             jwt.verify(token, process.env.JWT_SECRET, async (err, decodeToken) => {
//                 if (err) {
//                     res.locals.user = null;
//                 } else {
//                     await User.findById(decodeToken._id).then(user => {
//                         post = new postSchema({
//                             title,
//                             content,
//                             author: user.author,
//                             avatar: user.avatar,
//                             date: new Date()
//                         })
//                         post.save()
//                         res.send({
//                             success: true,
//                             message: 'post has been successfully saved'
//                         })
//                     })
//                 }
//             })
//         }
//     } catch (error) {
//         res.send({
//             error: true,
//             message: error,
//         })
//     }
// })

// router.get('/post', async (req, res) => {
//     postSchema.find()
//         .then(post => {
//             res.send(post)
//         })
// })

// router.get('/logged', async (req, res) => {
//     const token = req.session.authorization;
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, async (err, decodeToken) => {
//             if (err) {
//                 res.locals.user = null;
//             } else {
//                 await User.findById(decodeToken._id).then(user => {
//                     res.send({
//                         success: true,
//                         author: user.author,
//                         avatar: user.avatar
//                     })
//                 }).catch((error) => {
//                     res.send({
//                         error: true,
//                         message: error,
//                     });
//                 });
//             }
//         })
//     }
// })
module.exports = router;