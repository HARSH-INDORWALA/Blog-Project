import { Link } from "react-router";
import appwriteService from "../appwrite/conf";
function PostCard({$id,title,featuredImage}){
    return (
        
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-2">
                <div className="w-full h-48 overflow-hidden">
                    <img src={appwriteService.getFileView(featuredImage)} alt={title} className="w-full h-full object-cover"/>
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;