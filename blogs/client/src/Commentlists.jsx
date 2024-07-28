import React from 'react';

function Commentlists({ comments }) {
    console.log("The comment list from command list", comments);

    if (!Array.isArray(comments)) {
        comments = [];
    }

    return (
        <div>
            <ul>
                {comments.map(comment => {
                    let contentToShow;

                    if (comment.status === "rejected") {
                        contentToShow = "Comment has been rejected";
                    } else if (comment.status === "pending") {
                        contentToShow = "The comment is now in pending state";
                    } else {
                        contentToShow = `${comment.content} - ${comment.status}`;
                    }

                    return <li key={comment.id}>{contentToShow}</li>;
                })}
            </ul>
        </div>
    );
}

export default Commentlists;
