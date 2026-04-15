import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {

    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post?.userId && userData?.$id
    ? post.userId === userData.$id
    : false;
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
    <Container>

        <div className="max-w-3xl mx-auto px-2">

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-3">
                {post.title}
            </h1>

            {/* Meta */}
            <p className="text-sm text-gray-500 mb-4">
                {new Date(post.$createdAt).toDateString()}
            </p>

            {/* Image */}
            <div className="flex justify-center mb-6">
                <div className="relative w-full border rounded-xl shadow-md p-3">
                    <img
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-80 object-cover rounded-lg"
                    />

                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex gap-2 bg-white/80 backdrop-blur px-2 py-1 rounded-lg">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                {parse(post.content)}
            </div>

        </div>

    </Container>
</div>
    ) : null;
}