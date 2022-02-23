import React, { useState } from 'react'
import axios from 'axios'

//const baseURL = "https://jsonplaceholder.typicode.com/posts";

const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts"
});


export default function LearnApi() {

    const [post, setPost] = useState(null);

    const [error, setError] = useState(null);

    //create post
    const handleCreate = () => {
        const url ='https://jsonplaceholder.typicode.com/posts';

        axios.post(url, {
            title: "Hello My People",
            body: "Naso we dey greet ourselves for this part of the world o"
        }).then((response) => {
            setPost(response.data);
        });
    }

    //update a post
    const handleEdit = () => {
        //const url =baseURL+'posts';
        client.put('/1', {
            title:"Hello Again",
            body: "We still dey greet ourselves like this too o"
        })
        .then((response) => {
            setPost(response.data)
        })
        
    }

    //console.log(baseURL+'posts/1');
    const handleDelete = () => {
        client.delete("/1")
        .then(()=>{
            alert("Post deleted");
            setPost(null);
        });
    }
    
    //get posts
    React.useEffect(()=>{

        async function getPost() {
            const response = await client.get("/1");
            setPost(response.data);
        }
        getPost();

        // client.get("/1").then((response) => {
        //     setPost(response.data);
        // }).catch(error => {
        //     setError(error)
        // });

    }, []);

    if(error) return `Error: ${error.message}`;

    return (
        <div className="apiContainer">
            <h2>Learn API with react</h2>
            <div className="postMenu">
                <div className="btn" onClick={handleCreate}>Create Post</div>
                <div className="btn" onClick={handleEdit}>Edit Post</div>
                <div className="btn" onClick={handleDelete}>Delete Post</div>

            </div>
            {
                post && 
                <div className="postContainer">
                    <h1 className="postTitle">{post.title}</h1>
                    <p className="postBody">{post.body}</p>
                </div>
            }
            
        </div>
    );
}
