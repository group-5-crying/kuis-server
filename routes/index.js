const router = require('express').Router()
const Controller = require('../controllers/index')

router.get('/quiz/:id', Controller.findQuizById)

module.exports = router