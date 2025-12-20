import config from "../configuration/config";
import { Client, Account } from "appwrite";
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
                return await this.account.createEmailPasswordSession(email, passsword);
            } catch (error) {
                throw error;
            }
        }
        async getCurrentUser(){
            try {
                return await this.account.getSession();
            } catch (error) {
                throw error;
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

const authService=new AuthService();

export default authService;