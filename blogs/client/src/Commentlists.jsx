import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Commentlists({ postId }) {
    const [comments, setComments] = useState([]);

    console.log(comments, "checking");

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:7004/post/${postId}/comments`);
            console.log(res.data, 'resres');
            const data = Array.isArray(res.data) ? res.data : Object.values(res.data);
            setComments(data);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]); // Add postId to the dependency array

    return (
        <div>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li> // Ensure each item has a unique key
                ))}
            </ul>
        </div>
    );
}

export default Commentlists;