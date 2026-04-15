import { PostCard,Container } from "../components/index";
import { useState,useEffect } from "react";
import appwriteService from "../appwrite/conf";
function AllPosts(){
    const [posts,setPosts]=useState([])
     useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.rows)
        }
    })
    return (
        <div className="py-8">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post)=>(
                        <div key={post.$id}>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>

        </div>
    )
}

export default AllPosts;