import axios from 'axios';
import React, { useState } from 'react';

function Commentscreate({ postId }) {
    console.log(postId,"the postId may seems here");
    const [comment, setComment] = useState('');

    const submitComment = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:7004/post/${postId}/comments`, { content: comment });
            setComment('');
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    return (
        <div>
            <form onSubmit={submitComment}>
                <div>
                    <input value={comment} type="text" onChange={(e) => setComment(e.target.value)} />
                </div>
                <div>
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    );
}

export default Commentscreate;