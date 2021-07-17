const express = require('express');
const router = express.Router();
const auth = require('../middlewares/reqAuth');

const Post = require('../models/Post');

var bodyParser = require('body-parser');

router.use(bodyParser.json())
router.use(
    bodyParser.urlencoded({
        extended: true
    })
)

router.post('/post-test', async (req, res) => {
	let dd = auth.authToken(req.headers['authorization']);
	res.send(dd);
})
// Create A post for specific user - Create
router.post('/posts', async (req, res) => {
	console.log(req.body)
	let dd = auth.authToken(req.headers['authorization']);
	if (dd.status) {
		if (dd.data.roleno == 2) {
			const post = new Post({
				userID: dd.data._id,
				title: req.body.title,
				description: req.body.description
			})
			try {
				const savedPost = await post.save();
				res.json(savedPost)
			} catch (err) {
				res.json({
					message: err
				})
			}
		} else {
			res.json({
				message: "you cant access this"
			})
		}
	} else {
		res.json({
			message: "You cant access this"
		})
	}
});

// Get All Posts
router.get('/posts', async (req, res) => {
	let dd = auth.authToken(req.headers['authorization']);
	if (dd.status) {
		if (dd.data.roleno == 1 || dd.data.roleno == 2) {
			try {
				let posts = await Post.find({});
				res.json(posts);
			} catch (err) {
				res.json({
					message: err
				})
			}
		} else {
			res.json({
				message: "You cant access this"
			})
		}
	} else {
		res.json({
			message: "You cant access this"
		})
	}
})

// // Get All Posts for specific user
// router.get('/posts/:uid', async(req, res) => {
// 	try {
// 		const posts = await Post.find({ userID: { $eq: req.params.uid } });
// 		console.log(posts)
// 		res.json(posts);
// 	} catch(err) {
// 		res.json({ message: err });
// 	}
// });

// Get Specific Post
router.get('/posts/:postId', async (req, res) => {
	let dd = auth.authToken(req.headers['authorization']);
	if (dd.status) {
		if (dd.data.roleno == 1 || dd.data.roleno == 2) {
			try {
				const post = await Post.findById(req.params.postId);
				res.json(post);
			} catch (err) {
				res.json({
					message: err
				});
			}
		} else {
			res.json({
				message: "You cant access this."
			})
		}
	} else {
		res.json({
			message: "You cant access this."
		})
	}
});

// Update Specific Post of a user - Update
router.patch('/posts/:postId', async (req, res) => {
	let dd = auth.authToken(req.headers['authorization']);
	if (dd.status) {
		if (dd.data.roleno == 2) {
			try {
				const updatedPost = await Post.updateOne({
					_id: req.params.postId
				}, {
					$set: {
						description: req.body.description
					}
				});
				res.json(updatedPost);
			} catch (err) {
				res.json({
					message: err
				});
			}
		} else {
			res.json({
				message: "You cant access this."
			})
		}
	} else {
		res.json({
			message: "You cant access this."
		})
	}
});

// Delete Specific Post of a user - Delete
router.delete('/posts/:postId', async (req, res) => {
	let dd = auth.authToken(req.headers['authorization']);
	if (dd.status) {
		if (dd.data.roleno == 2) {
			try {
				const removedPost = await Post.remove({
					_id: req.params.postId
				});
				res.json(removedPost);
			} catch (err) {
				res.json({
					message: err
				});
			}
		} else {
			res.json({
				message: "You cant access this."
			})
		}
	} else {
		res.json({
			message: "You cant access this."
		})
	}
});

module.exports = router;