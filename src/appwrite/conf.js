import config from "./config.js";
import { Client,ID,Databases,Storage,Query, AppwriteException } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appWriteURl) 
            .setProject(config.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,content,slug,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: Get Post error",error);
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
                return await this.databases.updateDocument(
                    config.appwriteDatabaseId,
                    config.appwriteTableId,
                    slug,
                    {   
                        title,
                        content,
                        featuredImage,
                        status,
                    }   
                ) } catch (error) {
            console.log("Appwrite Error :: Update Post error",error);
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,   
            )
            return true;
        } catch (error) {
            console.log("Appwrite Error :: Delete Post error",error);
            return false;
        }

    }

    async getPosts(){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                queries=[Query.equal("status","active")],
            )
        } catch (error) {
            console.log("Appwrite Error :: Get Post error",error); 
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite Error :: Get Post error",error); 
        }
    }

    //file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite Error :: File upload error",error);
        }
    }

    async deleteFile(fileId){
       try {
        return await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId);
       } catch (error) {
        console.log("Appwrite Error :: File delete error",error);
       }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId);
        } catch (error) {
            console.log("Appwrite Error :: Get file preview error",error);
        }
    }   
}
const service=new Service();

export default service;
