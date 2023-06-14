const express = require("express");
const post_router = express.Router();

const Posts = require("./posts-model.js");

post_router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Gönderiler alınamadı" });
  }
});

post_router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({ message: "Gönderi bilgisi alınamadı" });
  }
});

post_router.post("/", async (req, res) => {
  try {
    let { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        message: "Lütfen gönderi için bir title ve contents sağlayın",
      });
    } else {
      const inserted = await Posts.insert({ title, contents });
      const insertedPost = await Posts.findById(inserted.id);
      res.status(201).json(insertedPost);
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi eklenemedi" });
  }
});


post_router.put("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID li gönderi bulunamadı" });
    } else {
      if (!req.body.title || !req.body.contents) {
        res.status(400).json({
          message: "Lütfen gönderi için bir title ve contents sağlayın",
        });
      } else {
        await Posts.update(req.params.id, req.body);
        const updatedPost = await Posts.findById(req.params.id);
        res.status(200).json(updatedPost);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi güncellenemedi" });
  }
});

post_router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      await Posts.remove(req.params.id);
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi silinemedi" });
  }
});

post_router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      const comments = await Posts.findPostComments(req.params.id);
      res.status(200).json(comments);
    }
  } catch (error) {
    res.status(500).json({ message: "Yorumlar alınamadı" });
  }
});

module.exports = post_router;
