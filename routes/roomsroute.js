const express = require('express');

const router = express.Router();
const roomsController = require('../controllers/roomsController')

router.get('/', roomsController.ger_all_rooms);
router.post('/', roomsController.create_room);
router.patch('/updateRoom/:id', roomsController.update_room_no);
router.patch('/updateRoomCost/:id', roomsController.update_room_cost);


module.exports = router;
