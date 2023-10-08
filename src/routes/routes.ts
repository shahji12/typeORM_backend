import express from 'express';
import { addSlider, deleteSlider, getSlider, updateSlider } from '../controller/slider-controller';
import { addUser, getAllUser, login } from '../controller/user-controller';
import { addVideos, deleteVideo, getAllVideos, updateVideo } from '../controller/video-controller';
export const router = express.Router();

// Get User
router.get('/', getAllUser);

// Add User
router.post('/addUser', addUser);

//Login user
router.post('/logUser', login);


// Add slider
router.post('/addSlider', addSlider)

// Get all slider
router.get('/slider', getSlider)

// Update slider

router.put('/updateSlider/:id', updateSlider)

// Delete Slider
router.delete('/deleteSlider/:id',deleteSlider)



// Get Videos
router.get('/get-videos', getAllVideos)

// Add Videos
router.post('/add-videos', addVideos)

// Update Videos
router.put('/update-videos/:id', updateVideo)

// Delete Video
router.delete('/delete-videos/:id', deleteVideo)