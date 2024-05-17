import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

import router from '../routes/index.js';
import errorHandler  from '../middlewares/errorHandler.js';


dotenv.config();

const app = express();

const whitelist = [
  '*'
];

app.use((req, res, next) => {
  const origin = req.get('referer');
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  // Pass to next layer of middleware
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};

app.use(setContext);


// app.use(cors(
//     {
//         origin: ['*'],  //[`${process.env.LINK}`],
//         methods: ['GET','POST'],
//         credentials: true
//     }
// ));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

mongoose.connect(process.env.MONGO).then(()=>{ 

    // const server = http.createServer(app);
    // server.listen (''''''''''''''''''''''''''''''''''''''''')
    app.listen(`${process.env.PORT}`, 
        () => { console.log(`Connected to Database & listening to ${process.env.PORT}`);  });
})
.catch((error)=>{  console.log('Error: ',error) });
      

//this handles 'GET' requests  when page refreshes to any page etc...
// by building a static view of frontend and navigating to those pages when required
//after doing npm run build on frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, '../dist/index.html')); });
app.get('*', (req, res) => { console.log("building_static_pages_at_GET_req"); res.sendFile(path.resolve(__dirname, '../dist/index.html')); });


app.use(router);  //if it handles GET requests, maybe do this instead of redirecting those GET requests to npm run build

app.use(errorHandler); //after req-res cycle completes

export default app;