const express = require('express');
const router = express.Router();
const user_meal = require('../controllers/user_meal')

router.get('/', user_meal.user_meal.get)
router.post('/', user_meal.user_meal.post)
router.delete('/',user_meal.user_meal.delete)



module.exports = router;