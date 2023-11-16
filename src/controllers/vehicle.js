const vehicleModel = require('../models/vehicle');
const helpers = require('../helpers/helpers');
const createError = require('http-errors');
const path = require('path');
const cloudinary = require('../middlewares/cloudinary');
// const redis = require('redis')
// const client = redis.createClient(6379)
// const fs = require('fs')
const getAllVehicle = (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const column = req.query.column;
  const search = req.query.search;
  const sort = req.query.sort;
  // const sortBy = sort.toUpperCase()
  const keyword = req.query.keyword;
  vehicleModel
    .getAllVehicle(page, limit, column, search, sort, keyword)
    .then((result) => {
      const vehicles = result;
      // client.setex('allVehicle', 60, JSON.stringify(vehicles))
      helpers.response(res, vehicles, 200);
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = new createError.InternalServerError();
      next(errorMessage);
    });
};

const getVehicleByTypeAndCity = (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const type = req.query.type;
  const city = req.query.city;
  const sort = req.query.sort;
  vehicleModel
    .getVehicleByTypeAndCity(page, limit, type, city, sort)
    .then((result) => {
      const vehicles = result;
      // client.setex('allVehicle', 60, JSON.stringify(vehicles))
      helpers.response(res, vehicles, 200);
  })
    .catch((error) => {
      console.log(error);
      const errorMessage = new createError.InternalServerError();
      next(errorMessage);
    });
}

const getVehicleById = async(req, res, next) => {
  const id = req.params.idsaya;
  let quantityTaken = 0
  await vehicleModel.checkQuantity(id).then((result) => {
    result.forEach(element => {
      console.log(element.quantity)
      quantityTaken = quantityTaken + element.quantity
    });
  }).catch((err) => {
    console.log(err)
  })
  console.log('test')
  console.log(quantityTaken)
  vehicleModel
    .getVehicleById(id)
    .then((result) => {
      const vehicles = result;
      let quantityAvailability = false
      if (vehicles[0].stock - quantityTaken > 0) {
        quantityAvailability = true
      } else {
        quantityAvailability = false
      }
      vehicles[0].quantityAvailability = quantityAvailability
      // client.setex(`vehicle/${id}`, 60, JSON.stringify(vehicles))
      helpers.response(res, vehicles, 200);
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = new createError.InternalServerError();
      next(errorMessage);
    });
};

const insertVehicle = async (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const userRole = req.role;
  const userId = req.id;
  console.log(userRole);
  console.log(req.file)
  if (userRole === 'admin' || userRole === 'user') {
    const { name, price, description, stock, city, type, prepayment } = req.body;
    const data = {
      name: name,
      price: price,
      description: description,
      stock: stock,
      img: `${process.env.BASE_URL}/file/${req.file.filename}`,
      prepayment: prepayment,
      type: type,
      city: city,
      userId: userId,
      createdAt: new Date(),
    };
    // if (req.file) {
    //   data.img = req.file;
    //   const uploader = async (path) => await cloudinary.uploads(path, 'Vehicle Rental');
    //   const { path } = data.img;
    //   const newPath = await uploader(path);
    //   data.img = newPath.url;
    // }  
    // fs.unlinkSync(path.dirname(''))
    vehicleModel
      .insertVehicle(data)
      .then(() => {
        // console.log(res)
        helpers.response(res, data, 200);
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = new createError.InternalServerError();
        next(errorMessage);
      });
  } else {
    const errorMessage = new createError.Forbidden();
    next(errorMessage);
  }
};

const updateVehicle = async (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const id = req.params.id;
  const { name, price, description, stock, city, type, prepayment } = req.body;
  let imageProduct = "";
  let imageProductInput = "";
  if (!req.file) {
    imageProductInput = ""
  } else {
    imageProductInput = req.file.filename
  }
  await vehicleModel.getVehicleById(id).then((result) => {
    const oldImageProduct = result[0].img
    const newImageProduct = `${process.env.BASE_URL}/file/${imageProductInput}`
    if (imageProductInput == '') {
      imageProduct = oldImageProduct
    } else {
      imageProduct = newImageProduct
    }
  })
  const data = {
    name: name,
    price: price,
    description: description,
    stock: stock,
    img: imageProduct,
    prepayment: prepayment,
    type: type,
    city: city,
    updatedAt: new Date(),
  };
  // if (req.file) {
  //   data.img = req.file;
  //   const uploader = async (path) => await cloudinary.uploads(path, 'Vehicle Rental');
  //   const { path } = data.img;
  //   const newPath = await uploader(path);
  //   data.img = newPath.url;
  // }  
  const userRole = req.role;
  if (userRole === 'admin' || userRole === 'user') {
    vehicleModel
      .updateVehicle(id, data)
      .then(() => {
        res.json({
          message: 'data berhasil di insert',
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = new createError.InternalServerError();
        next(errorMessage);
      });
  } else {
    const errorMessage = new createError.Forbidden();
    next(errorMessage);
  }
};

const deleteVehicle = (req, res, next) => {
  const id = req.params.id;
  const userRole = req.role;
  if (userRole === 'admin' || userRole === 'user') {
    vehicleModel
      .deleteVehicle(id)
      .then(() => {
        res.status(200);
        res.json({
          message: 'data berhasil di hapus',
        });
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = new createError.InternalServerError();
        next(errorMessage);
      });
  } else {
    const errorMessage = new createError.Forbidden();
    next(errorMessage);
  }
};

module.exports = {
  getAllVehicle,
  getVehicleById,
  getVehicleByTypeAndCity,
  insertVehicle,
  updateVehicle,
  deleteVehicle,
};
