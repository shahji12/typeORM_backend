import { appDataSoure } from "../db/connection";
import { Movies} from "../entity/movies";
import { Request } from "express";
import { Response } from "express";



export const getAllMovies = async (req : Request, res : Response)=>{

    const moviesRepo = appDataSoure.getRepository(Movies);
    const getAll = await moviesRepo.find();
    res.json(getAll).status(200);
}

export const  addMoviess = async (req : Request, res : Response) =>{

    const {title,detail,poster,attachment} = req.body;

    try{
        const moviesRepo = appDataSoure.getRepository(Movies);
        let moviesData : Movies = new Movies();
            moviesData.title = title;
            moviesData.detail = detail;
            moviesData.poster = poster;
            moviesData.attachment = attachment;
    
        const moviesContent = await moviesRepo.save(moviesData);
        res.json({response: moviesContent, message: 'movies has added successfully'});
    }
    catch(err : any){
        res.json(err).status(400)

    }
}

export const updateMovies = async ( req : Request, res: Response)=>{
    const {title,detail,poster,attachment} = req.body;
    const id = req.params.id;

    try{
        const moviesRepo = appDataSoure.getRepository(Movies);
    
        const moviesUpdate = await moviesRepo.update(id,{title:title,detail:detail,poster:poster,attachment:attachment});
        res.json({response: moviesUpdate, message: 'movies has updated successfully'}).status(200);
    }
    catch(err : any){
        res.json(err).status(400)

    }
}

export const deleteMovies = async ( req : Request, res: Response)=>{
    const id = req.params.id;

    try{
        const moviesRepo = appDataSoure.getRepository(Movies);
    
        const moviesDelete = await moviesRepo.delete(id);
        res.json({message: 'movies has deleted successfully'}).status(200);
    }
    catch(err : any){
        res.json(err).status(400)

    }
}