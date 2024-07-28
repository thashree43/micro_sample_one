import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Commentscreate from './Commentscreate';
import Commentlists from './Commentlists';

function Postslists() {
    const [posts, setPosts] = useState({});

    const fetchdata = async () => {
        try {
            const res = await axios.get('http://localhost:7001/post');
            setPosts(res.data);
            console.log(res, "res data");
        } catch (error) {
            console.error("Error in fetching the data", error);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div>
            <ul>
                {Object.entries(posts).map(([id, post]) => (
                    <li key={id}>
                        <h2>{post.title}</h2>
                        <Commentlists comments={post.comments} /> 
                        <Commentscreate postId={post.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Postslists;
