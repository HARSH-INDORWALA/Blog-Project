import { PostCard,Container } from "../components/index";
import { useState,useEffect } from "react";
import appwriteService from "../appwrite/conf";
function AllPost(){
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((post)=>setPosts(post))
    },[])
    return (
        <div className="py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div key={post.$id}>
                            <PostCard post={post}/>
                        </div>
                    ))}
                </div>
            </Container>

        </div>
    )
}

export default AllPost;