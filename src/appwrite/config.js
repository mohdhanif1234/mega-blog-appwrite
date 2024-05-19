import config from "../config/config.js"
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const post = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

            console.log(post)
            return post;

        } catch (error) {
            console.log(`Appwrite service :: createPost :: error :: ${error}`)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const post = await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            console.log(post)
            return post;

        } catch (error) {
            console.log(`Appwrite service :: updatePost :: error :: ${error}`)
        }
    }

    async deletePost(slug) {
        try {
            const post = await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )

            console.log(post);
            return true;

        } catch (error) {
            console.log(`Appwrite service :: deletePost :: error :: ${error}`)
            return false;
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )

            console.log(post);
            return post;

        } catch (error) {
            console.log(`Appwrite service :: getPost :: error :: ${error}`);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            const posts = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )

            console.log(posts);
            return posts;
            
        } catch (error) {
            console.log(`Appwrite service :: getPosts :: error :: ${error}`);
        }
    }

    //file upload service

    async uploadFile(file) {
        try {
            const response = await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )

            console.log(response);
            return response;

        } catch (error) {
            console.log(`Appwrite service :: uploadFile :: error :: ${error}`);
            return false
        }
    }

    // file delete service
    async deleteFile(fileId) {
        try {
            const response = await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )

            console.log(response);
            return response

        } catch (error) {
            console.log(`Appwrite service :: deleteFile :: error :: ${error}`);
            return false
        }
    }

    async getFilePreview(fileId) {
        try {
            const response = await this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
            console.log(response);
            return response;

        } catch (error) {
            console.log(`Appwrite service :: getFilePreview :: error :: ${error}`);
            return false
        }
    }
}

const service = new Service();

export default service;