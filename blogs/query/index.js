const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(express.json());

let posts = {};

app.get('/post', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log("Event received:", type, data);

  if (type === "postcreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    console.log("Post created:", posts[id]);
  }

  if (type === 'CommentCreated') {
    const { id, content, postId ,status} = data;
    const post = posts[postId];
    if (post) {
      post.comments.push({ id, content ,status});
      console.log("Comment added to post:", post);
    }
  }

  if(type === "commentupdated"){
    const { id, content, postId ,status} = data;
    const post = posts[postId]
    const comment = post.comments.find(comment =>{
      return comment.id === id
    })
    comment.content = content
    comment.status = status
    console.log("the commentupdated status",status);
  }

  console.log("Updated posts:", posts);
  res.send({});
});

const PORT = 7001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
