const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.get('/', studentController.view);
router.get('/adduser', studentController.addUser);
router.post('/adduser', studentController.save);
module.exports = router;