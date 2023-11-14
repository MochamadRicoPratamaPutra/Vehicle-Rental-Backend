const express = require('express')
const router = express.Router()
const reservationController = require('../controllers/reservation')
const auth = require('../middlewares/auth')
// const redisCache = require('../middlewares/redis')

router
  .get('/', auth.verifyAccess, reservationController.getAllReservation)
  .get('/:id', auth.verifyAccess, reservationController.getReservationById)
  .get('/user/:id', auth.verifyAccess, reservationController.getReservationUser)
  .post('/', auth.verifyAccess, reservationController.insertReservation)
  .use('/payment/:id', auth.verifyAccess, reservationController.approvePayment)
  .use('/change-status/:id', auth.verifyAccess, reservationController.changeStatusReservation)
  .delete('/:id', auth.verifyAccess, reservationController.deleteReservation)
module.exports = router
