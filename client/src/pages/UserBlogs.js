import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");

      const { data } = await axios.get(`api/v1/blog/user-blog/${id}`);

      if (data?.success && data?.userBlog) {
        setBlogs(data.userBlog.blogs);
      } else {
        console.log("No blogs found or incorrect response structure");
        setBlogs([]); // Prevent undefined errors
      }
    } catch (error) {
      console.log("Error fetching user blogs:", error);
      setBlogs([]);
    }
  };

  useEffect(() => {
    getUserBlogs();
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
            id={blog._id}
            isUser={true}
            key={blog._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You have not created any Blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;
