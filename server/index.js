const express = require("express");
const mongoose = require("mongoose");
const PostModel = require("./models/Posts");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const password = process.env.MONGODB_PASSWORD;

mongoose.connect(
  `mongodb+srv://vignes:${password}@cluster0.k5rcf0g.mongodb.net/posts?retryWrites=true&w=majority`
);

app.get("/", async (req, res) => {
  try {
    const result = await PostModel.find({});
    if (!result) {
      res.status(404).send("No Post found");
    } else {
      res.json(result);
    }
  } catch (err) {
    res.json(err);
  }
});

app.post("/addPost", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(201).send("Post Created");
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.put("/update/:id/:name", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      res.status(404).send("No item found");
    } else {
      const name = req.params.name;
      post.reactions[name] += 1;
      await post.save();
      res.status(200).send("User " + name + " your post");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/remove/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      res.status(404).send("No item found");
    } else {
      await PostModel.deleteOne({ _id: req.params.id });
      res.status(200).send("Post deleted");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log("Server Running...");
});
