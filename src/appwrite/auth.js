import { Client, Account, ID } from "appwrite";
import config from "../config/config.js"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteProjectId)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log(userAccount)
            if (userAccount) {
                // call another method
                return this.login({ email, password })
            }
            else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const emailSession = await this.account.createEmailSession(email, password);
            console.log(emailSession)
            return emailSession
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            const currentUser = await this.account.get()
            console.log(currentUser)
            return currentUser
        } catch (error) {
            throw error
        }

        return null;
    }

    async logout() {
        try {
            const deletedSessions = await this.account.deleteSessions()
            console.log(deletedSessions)
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService
