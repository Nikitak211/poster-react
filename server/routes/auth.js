//Third party packeges
const express = require('express');
const router = express.Router();
const bcrypt = require('Bcryptjs');
const jwt = require('jsonwebtoken');

//Local imports
const User = require('../models/User')
const postSchema = require('../models/postSchema')
const commentSchema = require('../models/commentSchema')

router.use(express.json())

router.post('/register', async (req, res) => {
    try {
        const {
            author,
            password,
            email,
            date
        } = req.body;

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

router.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        await User.findOne({ email })
            .then(user => {
                if (user) {

                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) {
                            res.send({
                                error: true,
                                message: 'somthing went wrong'
                            })
                        }

                        if (result) {

                            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
                            req.session.authorization = token
                            return res.send({
                                success: true,
                                isAuth: 'Login successfully',
                                token
                            })
                        } else {
                            return res.send({
                                error: true,
                                message: 'email or password is incorrect'
                            });
                        }
                    })
                } else {
                    res.send({
                        error: true,
                        message: "email or password is incorrect"
                    })
                }
            }).catch((error) => {
                console.error(error)
            })
    } catch (error) {

    }
});

router.post('/logout', (req, res) => {

    req.session.destroy((error) => {
        if (!error) {
            res.send({
                success: true,
                message: "Logged out."
            })
        }
        if (error) {
            res.send({
                error: true,
                message: 'an error has been encountered'
            })
        };
    })
})

router.post('/post', async (req, res) => {
    try {
        const {
            title,
            content
        } = req.body

        const HashId = await bcrypt.hash(content + title, 12);
        const token = req.session.authorization;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodeToken) => {
                if (err) {
                    res.locals.user = null;
                } else {
                    await User.findById(decodeToken._id).then((user, post) => {
                        post = new postSchema({
                            title,
                            content,
                            author: user.author,
                            avatar: user.avatar,
                            date: new Date(),
                            _id: HashId
                        })
                        post.save()
                        user.posts.push(post)
                        user.save()
                        res.send({
                            success: true,
                            message: 'post has been successfully saved'
                        })
                    })
                }
            })
        }
    } catch (error) {
        res.send({
            error: true,
            message: error,
        })
    }
})
router.post('/postcomment', async (req, res) => {
    try {
        const {
            content,
            _id
        } = req.body


        const token = req.session.authorization;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodeToken) => {
                if (err) {
                    res.send({
                        error: true,
                        message: err
                    })
                    res.locals.user = null;
                } else {
                    await User.findOne({ _id: decodeToken._id }).then(async (user) => {
                        await postSchema.findOne({ _id: _id}).then((post, comment) => {
                            // console.log(post)
                            if (post !== null) {
                                comment = new commentSchema({
                                    content,
                                    author: user.author,
                                    avatar: user.avatar,
                                    date: new Date()
                                })
                                comment.save()
                                post.comments.push(comment)
                                post.save()
                                res.send({
                                    success: true,
                                    message: "comment sent!"
                                })
                            } else { return null }
                        })
                    })
                }
            })
        }
    } catch (error) {
        res.send({
            error: true,
            message: error,
        })
    }
})

router.get('/post', async (req, res) => {
    postSchema.find()
        .then((post) => {
            res.send({ post })
        })

})

router.get('/logged', async (req, res) => {
    const token = req.session.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodeToken) => {
            if (err) {
                res.send({
                    outdated: true,
                })
                res.locals.user = null;
            } else {
                await User.findById(decodeToken._id).then(user => {
                    res.send({
                        success: true,
                        exp: decodeToken.exp,
                        author: user.author,
                        avatar: user.avatar
                    })
                }).catch((error) => {
                    res.send({
                        error: true,
                        message: error,
                    });
                });
            }
        })
    } else {
        res.send({
            outdated: true,
        })
    }
})

module.exports = router;