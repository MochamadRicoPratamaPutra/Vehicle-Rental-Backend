const express = require('express')
const router = express.Router()
const vehicleController = require('../controllers/vehicle')
const upload = require('../middlewares/multer')
const auth = require('../middlewares/auth')
// const redisCache = require('../middlewares/redis')
router
  .get('/', vehicleController.getAllVehicle)
  .get('/:idsaya', vehicleController.getVehicleById)
  .post('/', auth.verifyAccess, upload.single('img'), vehicleController.insertVehicle)
  .put('/:id', auth.verifyAccess, upload.single('img'), vehicleController.updateVehicle)
  .delete('/:id', auth.verifyAccess, vehicleController.deleteVehicle)
module.exports = router