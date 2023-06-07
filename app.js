import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";

const app = express();
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog/", blogRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

mongoose
    .connect("mongodb+srv://u2005316:LNF7ljmRCZgZDvl7@cluster0.sjrtgch.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to the database and listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
        process.exit(1); // Exit the process on database connection error
    });
