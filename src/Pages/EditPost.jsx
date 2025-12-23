import { Navigate,useNavigate,useParams } from "react-router";
import { useState,useEffect } from "react";
import appwriteService from "../appwrite/conf";
import { Container, PostCard } from "../components";
function EditPost(){
    const [posts,setPosts]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            appwriteService.updatePost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
                else {
                    navigate("/")
                }
            })
        }
    },[slug,navigate])
    return posts?
    <div className="py-8">
        <Container>
            <PostCard post={posts}/>
        </Container>
    </div>:null
}

export default EditPost;