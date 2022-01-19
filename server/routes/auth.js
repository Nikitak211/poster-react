//Third party packeges
const express = require('express');
const router = express.Router();
const bcrypt = require('Bcryptjs');
const jwt = require('jsonwebtoken');

//Local imports
const User = require('../models/User')
const Posts = require('../models/Posts')
const Comments = require('../models/Comments')
const Like = require('../models/Likes')
const DisLikes = require('../models/DisLikes');
const Password = require('../models/Password');

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
        let passwords = await Password.findOne({ email })

        if (user) {
            return res.send({
                error: true,
                message: "email allready exsisting"
            })
        }
        if (passwords) {
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
            email,
            date,
            avatar: randomAvatar
        })

        passwords = new Password({
            user_id: user.id,
            email,
            password: hashedPass
        })
        await user.save()
        await passwords.save()
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
            .then(async user => {
                await Password.findOne({ user_id: user.id, email })
                    .then(async passwords => {
                        if (user) {
                            bcrypt.compare(password, passwords.password, function (err, result) {
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
                            await Posts.find({ user_id: user._id })
                                .then(async (post) => {
                                    if (post !== null) {
                                        post.map(posts => {
                                            posts.status = true
                                            posts.save()
                                        })
                                    } else { return null }
                                    await Comments.find({ user_id: user._id })
                                        .then((comment) => {
                                            if (comment !== null) {
                                                comment.map(comments => {
                                                    comments.status = true
                                                    comments.save()
                                                })
                                            } else { return null }
                                        })
                                })
                            user.status = true;
                            user.save()
                        } else {
                            res.send({
                                error: true,
                                message: "email or password is incorrect"
                            })
                        }
                    })

            }).catch((error) => {
                console.error(error)
            })
    } catch (error) {

    }
});

router.post('/logout', (req, res) => {
    const token = req.session.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodeToken) => {
            if (err) {
                req.session.destroy((error) => {
                    if (!error) {
                        res.send({
                            outdated: true,
                            message: "Logged out."
                        })
                    }
                    if (error) {
                        res.send({
                            outdated: true,
                            message: 'an error has been encountered'
                        })
                    };
                })
                res.locals.user = null;
            } else {
                await User.findByIdAndUpdate(decodeToken._id).then(async (user) => {
                    await Posts.find({ user_id: user._id })
                        .then(async (post) => {
                            if (post !== null) {
                                post.map(posts => {
                                    posts.status = false
                                    posts.save()
                                })
                            } else { return null }
                            await Comments.find({ user_id: user._id })
                                .then((comment) => {
                                    if (comment !== null) {
                                        comment.map(comments => {
                                            comments.status = false
                                            comments.save()
                                        })
                                    } else { return null }
                                })
                        })
                    user.status = false
                    user.save()
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
router.post('/deletePost', (req, res) => {
    const {
        post_id
    } = req.body;

    const token = req.session.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodeToken) => {
            if (err) {
                res.send({
                    outdated: true,
                })
                res.locals.user = null;
            } else {
                await User.findByIdAndUpdate(decodeToken._id).then(async (user) => {
                    await Posts.findOneAndRemove({ user_id: user._id, _id: post_id })
                        .then(async (post) => {

                            await Comments.deleteMany({ post_id: post._id }).then(async (comment) => {
                                await Like.deleteMany({ post_id: post._id }).then(async like => {
                                    await DisLikes.deleteMany({ post_id: post._id }).then(dislike => {
                                        if (comment !== null) {
                                            res.send({
                                                success: true,
                                                message: "post has been deleted"
                                            })
                                        } else { return null }
                                    })
                                })
                            })
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

router.post('/post', async (req, res) => {
    try {
        const {
            content
        } = req.body

        const token = req.session.authorization;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodeToken) => {
                if (err) {
                    res.locals.user = null;
                } else {
                    await User.findById(decodeToken._id).then((user, post) => {
                        post = new Posts({
                            content,
                            author: user.author,
                            avatar: user.avatar,
                            date: new Date(),
                            user_id: user.id,
                            status: user.status,
                        })
                        post.save()
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

router.post('/friendreq', async (req, res) => {
    const { uid, puid } = req.body
    await User.findByIdAndUpdate({ _id: uid })
        .then(async user => {
                await User.findByIdAndUpdate({ _id: puid })
                    .then(puser => {
                        if (uid !== puid) {
                            console.log(puser._id, user._id)
                            if (user.request[0] !== undefined && user.request !== undefined) {
                                user.request.map(userrequest => {
                                    if (userrequest === puser._id + user._id) {
                                        res.send({
                                            message: "request allready sent"
                                        })
                                    }
                                })
                            } else {
                                user.request.push((puser._id + user._id))
                                user.save()
                                res.send({
                                    message: "friend request sent"
                                })
                            }

                            if (puser.pending[0] !== undefined && puser.pending !== undefined) {
                                puser.pending.map(puserpending => {
                                    if (puserpending === puser._id + user._id) {
                                        return null
                                    }
                                })
                            } else {
                                puser.pending.push((puser._id + user._id))
                                puser.save()
                            }
                        } else {
                            res.send({
                                success: false,
                                message: 'cannot add your self as a friend.'
                            })
                        }
                    })
             
        })
})

router.post('/acceptRequest', async (req, res) => {
    const { uid, puid } = req.body
    console.log(uid, puid)
    await User.findByIdAndUpdate(uid)
        .then(async user => {
            await User.findByIdAndUpdate(puid)
                .then(async user2 => {
                    console.log('im here')
                    user.request.map(main => {
                        console.log(main)
                        user2.pending.map(target => {
                            console.log(target)
                            if (main === target) {
                                console.log('its matching')
                                user.friends.push(target)
                                user2.friends.push(target)
                                let x = user.request.indexOf(target)
                                let y = user2.pending.indexOf(target)
                                user.request.splice(x, 1)
                                user2.pending.splice(y, 1)
                                user.save()
                                user2.save()
                            }
                        })
                    })
                })
        })

})


router.post('/friendcheck', async (req, res) => {
    const { uid, puid } = req.body

    await User.findById(uid)
        .then(async main => {
            await User.findById(puid)
                .then(target => {
                    if (main._id !== target._id) {
                        if(main.friends.includes(target.friends)){
                            res.send({
                                friends: true
                            })
                        }

                    }
                })
        })
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
                        await Posts.findOne({ _id: _id }).then((post, comment) => {
                            if (post !== null) {
                                comment = new Comments({
                                    content,
                                    author: user.author,
                                    avatar: user.avatar,
                                    date: new Date(),
                                    user_id: user._id,
                                    post_id: post._id,
                                    status: user.status
                                })
                                comment.save()
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

router.post('/likeComments', async (req, res) => {
    try {
        const {
            comment_id
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
                        await Comments.findById({ _id: comment_id }).then(async (comment) => {
                            await Like.find({ user_id: user._id, comment_id: comment._id }).then(async like => {
                                if (like[0] !== undefined) {
                                    await Like.deleteMany({ user_id: user._id, comment_id: comment._id })
                                        .then(async liked => {
                                            if (liked !== null) {
                                                res.send({
                                                    succsess: true,
                                                    message: "removed like"
                                                })
                                            }
                                        })
                                } else {
                                    like = new Like({
                                        user_id: user._id,
                                        comment_id: comment._id
                                    })
                                    like.save()
                                    res.send({
                                        succsess: true,
                                        message: "liked comment"
                                    })
                                }
                            })
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

router.get('/likeComments/:comment_id', async (req, res) => {
    try {
        const {
            comment_id
        } = req.params

        await Comments.findById({ _id: comment_id }).then(async comment => {
            await Like.find({ comment_id: comment._id }).then(async like => {
                res.send({
                    like
                })
            })
        })
    } catch (error) {
        res.send({
            error: true,
            message: error,
        })
    }
})

router.post('/dislikeComments', async (req, res) => {
    try {
        const {
            comment_id
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
                        await Comments.findById({ _id: comment_id }).then(async (comment) => {
                            await DisLikes.find({ user_id: user._id, comment_id: comment._id }).then(async dislike => {
                                if (dislike[0] !== undefined) {
                                    await DisLikes.deleteMany({ user_id: user._id, comment_id: comment._id })
                                        .then(async disliked => {
                                            if (disliked !== null) {
                                                res.send({
                                                    succsess: true,
                                                    message: "removed dislike"
                                                })
                                            }
                                        })
                                } else {
                                    dislike = new DisLikes({
                                        user_id: user._id,
                                        comment_id: comment._id
                                    })
                                    dislike.save()
                                    res.send({
                                        succsess: true,
                                        message: "disliked comment"
                                    })
                                }
                            })
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

router.get('/dislikeComments/:comment_id', async (req, res) => {
    try {
        const {
            comment_id
        } = req.params

        await Comments.findById({ _id: comment_id }).then(async comment => {
            await DisLikes.find({ comment_id: comment._id }).then(async dislike => {
                res.send({
                    dislike
                })
            })
        })
    } catch (error) {
        res.send({
            error: true,
            message: error,
        })
    }
})
router.post('/likePost', async (req, res) => {
    try {
        const {
            post_id
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
                        await Posts.findById({ _id: post_id }).then(async (post) => {
                            await Like.find({ user_id: user._id, post_id: post._id }).then(async like => {
                                if (like[0] !== undefined) {
                                    await Like.deleteMany({ user_id: user._id, post_id: post._id })
                                        .then(async liked => {
                                            if (liked !== null) {
                                                res.send({
                                                    succsess: true,
                                                    message: "removed like"
                                                })
                                            }
                                        })
                                } else {
                                    like = new Like({
                                        user_id: user._id,
                                        post_id: post._id
                                    })
                                    like.save()
                                    res.send({
                                        succsess: true,
                                        message: "liked comment"
                                    })
                                }
                            })
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

router.get('/likePost/:post_id', async (req, res) => {
    try {
        const {
            post_id
        } = req.params

        await Posts.findById({ _id: post_id }).then(async post => {
            await Like.find({ post_id: post._id }).then(async like => {
                res.send({
                    like
                })
            })
        })
    } catch (error) {
        res.send({
            error: true,
            message: error,
        })
    }
})

router.post('/dislikePost', async (req, res) => {
    try {
        const {
            post_id
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
                        await Posts.findById({ _id: post_id }).then(async (post) => {
                            await DisLikes.find({ user_id: user._id, post_id: post._id }).then(async dislike => {
                                if (dislike[0] !== undefined) {
                                    await DisLikes.deleteMany({ user_id: user._id, post_id: post._id })
                                        .then(async disliked => {
                                            if (disliked !== null) {
                                                res.send({
                                                    succsess: true,
                                                    message: "removed dislike"
                                                })
                                            }
                                        })
                                } else {
                                    dislike = new DisLikes({
                                        user_id: user._id,
                                        post_id: post._id
                                    })
                                    dislike.save()
                                    res.send({
                                        succsess: true,
                                        message: "disliked comment"
                                    })
                                }
                            })
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

router.get('/dislikePost/:post_id', async (req, res) => {
    try {
        const {
            post_id
        } = req.params

        await Posts.findById({ _id: post_id }).then(async post => {
            await DisLikes.find({ post_id: post._id }).then(async dislike => {
                res.send({
                    dislike
                })
            })
        })
    } catch (error) {
        res.send({
            error: true,
            message: error,
        })
    }
})

router.get('/post', async (req, res) => {
    Posts.find()
        .then((post) => {
            res.send({ post })
        })
})

router.get('/post/:_id', async (req, res) => {
    const { _id } = req.params

    Posts.find({ user_id: _id })
        .then((post) => {
            res.send({ post })
        })
})

router.post('/comments', async (req, res) => {
    const {
        post_id
    } = req.body
    Comments.find({ post_id })
        .then((comment) => {
            res.send({ comment })
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
                await User.findByIdAndUpdate(decodeToken._id).then(async (user) => {
                    await Posts.find({ user_id: user._id })
                        .then(async (post) => {

                            if (post !== null) {
                                post.map(posts => {
                                    posts.status = true
                                    posts.save()
                                })
                            } else { return null }
                            await Comments.find({ user_id: user._id })
                                .then((comment) => {

                                    if (comment !== null) {
                                        comment.map(comments => {
                                            comments.status = true
                                            comments.save()
                                        })
                                    } else { return null }
                                })
                        })
                    user.status = true
                    user.save()
                    res.send({
                        success: true,
                        exp: decodeToken.exp,
                        author: user.author,
                        avatar: user.avatar,
                        status: user.status,
                        _id: user._id,
                        pending: user.pending
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