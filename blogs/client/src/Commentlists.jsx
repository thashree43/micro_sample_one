import React, { useEffect, useState } from 'react';

function Commentlists({ comments }) {
    console.log("The comment list from CommentLists:", comments);
    
    if (!Array.isArray(comments)) {
        comments = [];
    }

    return (
        <div>
            <ul>
                {comments.map(comment => {
                    let contentshow;
                    if (comment.status === "rejected") {
                        contentshow = "Comment has been rejected";
                    } else if (comment.status === "pending") {
                        contentshow = "The comment is now in pending state";
                    } else {
                        contentshow = (
                            <li key={comment.id}>
                                {comment.content} - {comment.status}
                            </li>
                        );
                    }
                    return contentshow;
                })}
            </ul>
        </div>
    );
}

export default Commentlists;
