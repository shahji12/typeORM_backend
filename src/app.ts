import "reflect-metadata";
import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import {appDataSoure} from "./db/connection"
import { router } from "./routes/routes";
import passport from 'passport';
import session from 'express-session';



const app = express();
app.use(cors())
app.use(morgan('dev'))
const port = 3100;
app.use(express.json());

app.use('', router)




app.use(
  session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());





appDataSoure.initialize().then(()=>{
    console.log('Database has been connected successfully')
    app.listen(port, ()=>{
        console.log(`App running on ${port}.`)
    })
}).catch((err)=>{
    console.log('Database not connected',err)
})
