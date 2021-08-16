const express = require('express')
const router = express.Router()
const reservationController = require('../controllers/reservation')
const auth = require('../middlewares/auth')
// const redisCache = require('../middlewares/redis')

router
  .get('/', auth.verifyAccess, reservationController.getAllReservation)
  .get('/:id', auth.verifyAccess, reservationController.getReservationById)
  .post('/', auth.verifyAccess, reservationController.insertReservation)
  .delete('/:id', auth.verifyAccess, reservationController.deleteReservation)
module.exports = router
