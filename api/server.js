// server için gerekli olanları burada ayarlayın

// posts router'ını buraya require edin ve bağlayın
const express = require("express");
const server = express();
server.use(express.json());

const post_router = require("./posts/posts-router.js");

server.use("/api/posts", post_router);

module.exports = server;
