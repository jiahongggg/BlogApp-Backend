import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    }],
});

export default model("User", userSchema);
