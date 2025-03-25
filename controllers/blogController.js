const mongoose = require('mongoose'); 
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

// GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        if (!blogs || blogs.length === 0) {
            return res.status(200).send({
                success: false,
                message: 'No blog found'
            });
        }
        return res.status(200).send({
            blogCount: blogs.length,
            success: true,
            message: "All blog list",
            blogs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while getting Blogs',
            error
        });
    }
};

// GET SINGLE BLOG BY ID
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found with this id"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Fetch single blog",
            blog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while getting single blog",
            error
        });
    }
};

// CREATE BLOG (Without Transactions)
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;

        // Validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields",
            });
        }

        // Check if the user exists
        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "Unable to find user",
            });
        }

        // Create a new blog
        const newBlog = new blogModel({
            title,
            description,
            image,
            user, 
        });

        // Save the blog
        await newBlog.save();

        // Push the new blog to the user's blogs array and save the user
        existingUser.blogs.push(newBlog._id);
        await existingUser.save();

        return res.status(201).send({
            success: true,
            message: "Blog created successfully",
            newBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while creating blog",
            error,
        });
    }
};

// UPDATE BLOG
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Blog updated successfully",
            blog
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating blog",
            error
        });
    }
};

// DELETE BLOG
exports.deleteBlogController = async (req, res) => {
    try {
        const blog=await blogModel.findOneAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:'Blog Deleted!',
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while deleting blog",
            error
        });
    }
};


//GET USER BLOG
exports.userBlogController=async(req,res)=>{
    try {
        const userBlog=await userModel.findById(req.params.id).populate('blogs');
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:"blogs not found with this id"
            })
        }
        return res.status(200).send({
            success:true,
            message:"user blogs",
            userBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"error in user blog",
            error
        })
    }
}