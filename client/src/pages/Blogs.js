import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data.blogs);
      } else {
        console.log("No blogs found or incorrect response structure");
        setBlogs([]);
      }
    } catch (error) {
      console.log("Error fetching blogs:", error);
      setBlogs([]);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem('userId')===blog?.user?._id}
            key={blog?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog?.createdAt}
          />
        ))
      ) : (
        <h1>No blogs available</h1>
      )}
    </div>
  );
};

export default Blogs;
