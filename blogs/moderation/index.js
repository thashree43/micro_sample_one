const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === "CommentCreated") {
        const status = data.content.includes("orange") ? "rejected" : "approved";

        await axios.post("http://localhost:6995/events", {
            type: "commentmoderation",
            data: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status
            }
        });
    }

    res.send({});
});

const port = 7003;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
