import config from "../configuration/config";
import { Client, Account ,ID} from "appwrite";
    export class AuthService {
        client=new Client();
        account;
        constructor() {
            this.client
                .setEndpoint(config.appWriteURl) 
                .setProject(config.appwriteProjectId);
            this.account = new Account(this.client);
        }

        async createAccount({email, password,name}) {     
            try {
                const userAccount= await this.account.create(ID.unique(), email, password, name);
                if(userAccount){
                        return this.login({email, password});
                }
                else {
                    return userAccount;
                }
                
            } catch (error) {
                throw error;
            }
        }
        async login({email,passsword}){
            try {
                return await this.account.createSession(email, passsword);
            } catch (error) {
                throw error;
            }
        }
        async getCurrentUser(){
            try {
                return await this.account.getSession();
            } catch (error) {
                console.log("Appwrite Error :: Get Current User",error);
            } 
        }
        async logout(){ 
            try {
                return await this.account.deleteSessions();  
            } catch (error) {
                throw error
            }
        }  
}

export const authService=new AuthService();

export default authService;