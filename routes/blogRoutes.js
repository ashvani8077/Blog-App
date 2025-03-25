const express=require('express');
const { getAllBlogsController, getBlogByIdController, createBlogController, updateBlogController, deleteBlogController, userBlogController } = require('../controllers/blogController');
const router=express.Router();


//routes
//GET || all blogs
router.get('/all-blog',getAllBlogsController);

//GET || Get single blog by id
router.get('/get-blog/:id',getBlogByIdController)

//POST|| create new blog
router.post('/create-blog',createBlogController);

//PUT || Update the blog
router.put('/update-blog/:id',updateBlogController);

//DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogController)

//GET || User blog
router.get('/user-blog/:id',userBlogController)

module.exports=router;