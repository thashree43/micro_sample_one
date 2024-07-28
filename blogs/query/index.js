const express = require('express');
const cors = require('cors');
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

let posts = {};

app.get('/post', (req, res) => {
  res.send(posts);
});

const handleevents =(type,data)=>{

  if (type === "postcreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    console.log("Post created:", posts[id]);
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    if (post) {
      post.comments.push({ id, content, status });
      console.log("Comment added to post:", post);
    }
  }

  if (type === "commentupdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find(comment => comment.id === id);
    if (comment) {
      comment.content = content;
      comment.status = status;
    }
    console.log("Comment status updated:", status);
  }

}
app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log("Event received:", type, data);

  handleevents(type,data)
  console.log("Updated posts:", posts);
  res.send({});
});

const PORT = 7001;
app.listen(PORT, async() => {
  console.log(`Server running on http://localhost:${PORT}`);

  const res = await axios.get(`http://localhost:6995/events`);
  for(let even of res.data){
    console.log("processing the events",even.type);
    handleevents(even.type,even.data)
  }
});
