import config from "../configuration/config";
import { Client,ID,TablesDB,Storage,Query, AppwriteException,Permission,Role} from "appwrite";
export class Service{
    client=new Client();
    TablesDB;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appWriteURl) 
            .setProject(config.appwriteProjectId);
        this.TablesDB=new TablesDB(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,content,slug,featuredImage,status,userId}){
        try {
            return await this.TablesDB.createRow(
                {
                    databaseId: config.appwriteDatabaseId,
                    tableId: config.appwriteTableId,
                    rowId : slug,
                    data : {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    }
            })
        } catch (error) {
            console.log("Appwrite Error :: Get Post error",error);
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
                return await this.TablesDB.updateRow({
                        databaseId: config.appwriteDatabaseId,
                        tableId: config.appwriteTableId,
                        rowId: slug,
                        data: {
                        title,
                        content,
                        featuredImage,
                        status,
                    }
                    }) 
            } 
        catch (error) {
            console.log("Appwrite Error :: Update Post error",error);
        }
    }

    async deletePost(slug){
        try {
            return await this.TablesDB.deleteRow(
                {
                    databaseId: config.appwriteDatabaseId,
                    tableId: config.appwriteTableId,
                    rowId: slug
                }
            );
        } catch (error) {
            console.log("Appwrite Error :: Delete Post error",error);
            return false;
        }

    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.TablesDB.listRows({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                queries
            });
        } catch (error) {
            console.log("Appwrite Error :: Get Post error",error); 
        }
    }

    async getPost(slug){
        try {
            return await this.TablesDB.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug
            });
        } catch (error) {
            console.log("Appwrite Error :: Get Post error",error); 
        }
    }

    //file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                file : file,
            });
        } catch (error) {
            console.log("Appwrite Error :: File upload error",error);
            return null;
        }
    }

    async deleteFile(fileId){
       try {
        return await this.bucket.deleteFile({
            bucketId: config.appwriteBucketId,
            fileId : fileId
        });
       } catch (error) {
        console.log("Appwrite Error :: File delete error",error);
       }
    }

    getFileView(fileId){
        try {
            // console.log(appwriteService.getFilePreview(featuredImage));
            return this.bucket.getFileView({
                bucketId: config.appwriteBucketId,
                fileId: fileId
            });
        } catch (error) {
            console.log("Appwrite Error :: Get file preview error",error);
        }
    }   
}
const appwriteService=new Service();

export default appwriteService;
