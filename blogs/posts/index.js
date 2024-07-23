const express = require('express');
const app = express();
const cors = require('cors');
const axios = require("axios")

app.use(cors());
app.use(express.json());

let posts = {};

app.get('/post', (req, res) => {
  
  res.send(posts);
});
app.post('/post', async(req, res) => {
  const id = Math.random().toString(36).substring(7); 
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post(`http://localhost:6995/events`,{
    type:"postcreated",
    data:{
      id,
      title
    }
  })
  res.status(201).send(posts[id]);
});


app.post("/events",(req,res)=>{
  console.log("event may created in post  also ",req.body.type);
  res.send({});
})


const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
