const express = require('express');
const {createEvent,updateEvent,deleteEvent,registerForEvent} =require('../controllers/eventController');
const router = express.Router();

const {authenticate} = require('../middlewares/authMiddleware');

router.post('/',authenticate,createEvent);
router.put('/:id',authenticate,updateEvent);
router.delete('/:id',authenticate,deleteEvent);
router.post('/:id/register',authenticate,registerForEvent);

module.exports=router;
