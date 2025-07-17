import { rejects } from "assert";
import {v2 as cloudinary} from "cloudinary"
import { error } from "console";
import fs from "fs"
import { resolve } from "path";
import { Readable } from "stream";

 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });


const uploadCloudinary = async (buffer) =>{
   
    return new Promise ((resolve,rejects)=>{
        const uploadStream = cloudinary.uploader.upload_stream(
            {
            resource_type: "auto"
            },

            (error,result)=>{
                if(error){
                    return rejects(error);
                }
                resolve(result)
            }
    );


    console.log("file is upoladed ",uploadStream.url)
    
    const readableStream = new Readable();
    readableStream.push(buffer)
    readableStream.push(null)
    readableStream.pipe(uploadStream)

    }
)
    
}


export {uploadCloudinary}


