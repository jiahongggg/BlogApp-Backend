import express from 'express';
import { getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId } from '../controllers/blog-controller';

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);

// Error handling middleware
blogRouter.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});

export default blogRouter;
