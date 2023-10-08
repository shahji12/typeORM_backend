import { appDataSoure } from "../db/connection";
import { Videos } from "../entity/videos";
import { Request } from "express";
import { Response } from "express";



export const getAllVideos = async (req : Request, res : Response)=>{

    const videoRepo = appDataSoure.getRepository(Videos);
    const getAll = await videoRepo.find();
    res.json(getAll).status(200);
}

export const  addVideos = async (req : Request, res : Response) =>{

    const {title,detail,poster,attachment} = req.body;

    try{
        const videoRepo = appDataSoure.getRepository(Videos);
        let videoData : Videos = new Videos();
            videoData.title = title;
            videoData.detail = detail;
            videoData.poster = poster;
            videoData.attachment = attachment;
    
        const videoContent = await videoRepo.save(videoData);
        res.json({response: videoContent, message: 'Video has added successfully'});
    }
    catch(err : any){
        res.json(err).status(400)

    }
}

export const updateVideo = async ( req : Request, res: Response)=>{
    const {title,detail,poster,attachment} = req.body;
    const id = req.params.id;

    try{
        const videoRepo = appDataSoure.getRepository(Videos);
    
        const videoUpdate = await videoRepo.update(id,{title:title,detail:detail,poster:poster,attachment:attachment});
        res.json({response: videoUpdate, message: 'Video has updated successfully'}).status(200);
    }
    catch(err : any){
        res.json(err).status(400)

    }
}

export const deleteVideo = async ( req : Request, res: Response)=>{
    const id = req.params.id;

    try{
        const videoRepo = appDataSoure.getRepository(Videos);
    
        const videoDelete = await videoRepo.delete(id);
        res.json({message: 'Video has deleted successfully'}).status(200);
    }
    catch(err : any){
        res.json(err).status(400)

    }
}