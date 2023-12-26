const express = require("express");
const blogController = require("../Controller/blogController");
const {handleBlogCoverImages} = require("../Middleware/blogCoverImage")
const Router = express.Router();


// Render blog page
Router.route("/").get(blogController.blogPage)

// Create blog
Router.route("/add").post(handleBlogCoverImages, blogController.createBlog);

// Get user blogs
Router.route("/user-blogs").get(blogController.userBlogs)

// Get user blogs by title name
Router.route("/search").post(blogController.userBlogsByTitle)

// Render blog update page
Router.route("/blogUpdate-page").post(handleBlogCoverImages, blogController.updatePage)

// Update blog
Router.route("/update").post(handleBlogCoverImages, blogController.updateBlog)

// Delete blog
Router.route("/delete").post(blogController.userBlogDelete)

module.exports = Router