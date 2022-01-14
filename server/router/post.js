const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/auth')
const Post = require("../models/Post");

//@route Post api/posts
//@desc Create Post
//@access Private

router.post("/",verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //simple validation
  if (!title)
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN", //Neu ng dung k nhap gi thi se la To Learn ,
      user: req.userId
    });

    await newPost.save()

    res.json({success: true, message: 'Happy learning', newPost})

    return newPost
  } catch(error) {
      console.log(error)
      return res.json({success: false, message: 'Internal server error'})
  }
});

//@route GET api/posts
//@desc GET Post
//@access Private
router.get('/', verifyToken, async (req,res) => {
    try {
      //populate vao table user va lay ra mot object co nhung gia tru cua user, chi lay only username
      const posts = await Post.find({user: req.userId}).populate('user', ['username'])
      res.json({success: true, posts})
    }catch (error) {
      console.log(error)
      return res.json({success: false, message: 'Internal server error'})
    }
})


//@route PUT api/posts
//@desc Update Post
//@access Private
router.put('/:id', verifyToken, async(req,res) => {
  const {title,description,url,status} = req.body  

  if (!title)
    return res.status(400).json({
      success: false,
      message: "Title is required",
     

    });

  try {
    let updatedPost = {
      title,
      description: description || '',
      url: url.startsWith("https://") ? url : `https://${url}` || '',
      status: status || 'TO LEARN'

    }
    //Phai thoa man 2 dieu kien nay moi duoc phep thay doi post
    //user nay la user o trong Post
    const postUpdateCondition = {_id: req.params.id, user: req.userId}

    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true})
   
//user not authorise to update post or post not found
    if(!updatedPost) 
    return res.status(401).json({
      success: false,
      message: 'Post not found or user not authorized'
    })

    res.json({success: true, message: 'Excellent progress!', post: updatedPost})
   
  } catch(error) {
      console.log(error)
      return res.json({success: false, message: 'Internal server error'})
  }
})

//@route DELETE api/posts
//@desc DELETE Post
//@access Private

router.delete('/:id', verifyToken, async(req,res) => {
  try {
    const postDeleteCondition = {_id: req.params.id, user: req.userId}

    const deletePost = await Post.findOneAndDelete(postDeleteCondition)

    //User not authorized and post not found
    if(!deletePost) 
    return res.status(401).json({
      success: false,
      message: 'Post not found or user not authorized'
    })

    res.json({success: true, message: 'Delete successfully!', post: deletePost})

  } catch (error) {
    console.log(error)
      return res.json({success: false, message: 'Internal server error'})
  }
})



module.exports = router