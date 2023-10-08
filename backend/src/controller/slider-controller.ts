import { Request } from "express";
import { Response } from "express";
import { appDataSoure } from "../db/connection";
import { Slider } from "../entity/slider";



export const addSlider = async (req: Request,res:Response)=>{
    
    const {title, detail, imgUrl} = req.body

    try{
    const sliderRepo = appDataSoure.getRepository(Slider);

    let slider : Slider = new Slider ;
        slider.title = title;
        slider.detail = detail;
        slider.imgUrl = imgUrl;

    const sliderData = await sliderRepo.save(slider);

    res.status(201).json({sliderData, message:"Slider added successfully"});

    }
    catch(err:any){
        res.status(401).json(err)
    }

}


export const getSlider = async (req:Request,res:Response)=>{

    const sliderRepo = appDataSoure.getRepository(Slider);
    const getAllSlider = await sliderRepo.find();

    res.status(201).json(getAllSlider)
}


export const updateSlider = async (req:Request,res: Response)=>{
    const {title,detail,imgUrl} = req.body;
    req.body['id'] = req.params.id;
    let id = req.params.id;
    console.log('ID',id)

    try{
        const sliderRepo = appDataSoure.getRepository(Slider);
        const sliderUpdate = await sliderRepo.update(id,{title:title, detail:detail, imgUrl:imgUrl})
        res.status(201).json({slider:req.body, message:'Slider updated successfully'});
    }
    catch(err : any){
        res.status(401).json({message:'Slider not updated', err})
    }
}


export const deleteSlider = async(req:Request,res:Response)=>{
    let id = req.params.id;
    try{
        const sliderRepo = appDataSoure.getRepository(Slider);
        const sliderDelete = await sliderRepo.delete(id);
        res.status(201).json({message:"Slider deleted successfully"});
    }
    catch(err :any){
        res.status(400).json({message: "Slider not deleted", err})
    }
}