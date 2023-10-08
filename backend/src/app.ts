import "reflect-metadata";
import express from 'express';
import cors from 'cors'
import {appDataSoure} from "./db/connection"
import { router } from "./routes/routes";


const app = express();
app.use(cors())
const port = 3100;
app.use(express.json());

app.use('', router)

appDataSoure.initialize().then(()=>{
    console.log('Database has been connected successfully')
    app.listen(port, ()=>{
        console.log(`App running on ${port}.`)
    })
}).catch((err)=>{
    console.log('Database not connected',err)
})
