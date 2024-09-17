import { addSong, listSong ,  removeSong } from "../controllers/songControllers.js";
import express from 'express';
import upload from "../middleware/multer.js";

const songRouter = express.Router();

// Added a value for maxCount in the 'audio' field
songRouter.post('/add', upload.fields([
  { name: 'image', maxCount: 1 }, 
  { name: 'audio', maxCount: 1 }  // Specify maxCount here
]), addSong);

songRouter.get('/list', listSong);
songRouter.post('/remove',removeSong)

export default songRouter;
