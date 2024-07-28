import express from "express";
import { randomBytes } from "crypto";
import cors from 'cors';
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {}; 

app.get("/post/:id/comments", (req, res) => {
    console.log('Sending comments:', commentsByPostId[req.params.id] || []);
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/post/:id/comments", async (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    console.log("Received comment content:", content);

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: "pending" }); 
    commentsByPostId[req.params.id] = comments;

    try {
        await axios.post(`http://localhost:6995/events`, {
            type: "CommentCreated",
            data: {
                id: commentId,
                content,
                postId: req.params.id,
                status: "pending"
            }
        });
        console.log("Event sent to event bus.");
    } catch (error) {
        console.error("Error sending event to event bus:", error.message);
    }

    res.status(201).send(comments);
});

    app.post('/events', async(req, res) => {
        console.log("Event received in comments:", req.body.type);
        const {type ,data} = req.body

        if(type === "commentmoderation"){
            const {postId,id,status,content} = data
            const comments = commentsByPostId[postId]

            const comment = comments.find(comment =>{
                return comment.id === id
            })

            comment.status = status
            await axios.post("http:/localhost:6995",{
                type :"commentupdated",
                postId,
                id,
                status,
                content
            })

                    console.log("after this comment moderation the status be like this ",status);

        } 

        res.send({});
    });

const port = 7004;
app.listen(port, () => {
    console.log(`The port is running on http://localhost/${port}`);
});
