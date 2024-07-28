import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Commentscreate from './Commentscreate';
import Commentlists from './Commentlists';

function Postslists() {

    const [post, setPost] = useState({});

    console.log(post,"posts may ");
    const fetchdata = async () => {
        try {
            const res = await axios.get('http://localhost:7001/post');
            setPost(res.data);
            console.log(res,"res data");
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
                {Object.entries(post).map(([id, posts]) => (
                    <li key={id}>
                        <h2>{posts.title}</h2>
                        <Commentlists comments={posts.comments} /> 
                        <Commentscreate postId={posts.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Postslists;
