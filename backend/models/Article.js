import mongoose from "mongoose";

// A schema describes what ONE article looks like in the database
const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, default: "General" },
    image: { type: String, default: "" }, // a link to a picture
    content: { type: String, required: true },
  },
  { timestamps: true } // mongoose adds createdAt and updatedAt for us
);

// A model is the tool we use to talk to the "articles" collection
const Article = mongoose.model("Article", articleSchema);

export default Article;
