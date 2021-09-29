const reservationModel = require('../models/reservation');
const helpers = require('../helpers/helpers');
const createError = require('http-errors');
const path = require('path');
// const redis = require('redis')
// const client = redis.createClient(6379)
// const fs = require('fs')
const getAllReservation = (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const column = req.query.column;
  const search = req.query.search;
  const sort = req.query.sort;
  // const sortBy = sort.toUpperCase()
  const keyword = req.query.keyword;
  reservationModel
    .getAllReservation(page, limit, column, search, sort, keyword)
    .then((result) => {
      const reservations = result;
      // client.setex('allReservation', 60, JSON.stringify(reservations))
      helpers.response(res, reservations, 200);
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = new createError.InternalServerError();
      next(errorMessage);
    });
};
const getReservationById = (req, res, next) => {
  const id = req.params.id;
  reservationModel
    .getReservationById(id)
    .then((result) => {
      const reservations = result;
      // client.setex(`reservation/${id}`, 60, JSON.stringify(reservations))
      helpers.response(res, reservations, 200);
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = new createError.InternalServerError();
      next(errorMessage);
    });
};

const getReservationUser = (req, res, next) => {
  const id = req.params.id;
  reservationModel
    .getReservationUser(id)
    .then((result) => {
      const reservations = result;
      // client.setex(`reservation/${id}`, 60, JSON.stringify(reservations))
      helpers.response(res, reservations, 200);
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = new createError.InternalServerError();
      next(errorMessage);
    });
};

const insertReservation = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const userRole = req.role;
  const userId = req.id;
  console.log(userRole);
  if (userRole === 'admin' || userRole === 'user') {
    const { bookingCode, paymentCode, status, rentedFrom, vehicleId, quantity, paymentMethod, returnAt, totalPayment } =
      req.body;
    const data = {
      bookingCode: bookingCode,
      paymentCode: paymentCode,
      status: status,
      userIdBorrower: userId,
      vehicleId: vehicleId,
      paymentMethod: paymentMethod,
      quantity: quantity,
      totalPayment: totalPayment,
      createdAt: new Date(),
      rentedFrom: rentedFrom,
      returnAt: returnAt,
    };
    // fs.unlinkSync(path.dirname(''))
    reservationModel
      .insertReservation(data)
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
const deleteReservation = (req, res, next) => {
  const id = req.params.id;
  const userRole = req.role;
  if (userRole === 'admin' || userRole === 'user') {
    reservationModel
      .deleteReservation(id)
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
const approvePayment = (req, res, next) => {
  const id = req.params.id;
  const userRole = req.role;
  console.log(id);
  if (userRole === 'admin') {
    reservationModel
      .approvePayment(id)
      .then((result) => {
        const reservations = result;
        // client.setex(`reservation/${id}`, 60, JSON.stringify(reservations))
        helpers.response(res, reservations, 200);
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
module.exports = {
  getAllReservation,
  getReservationById,
  getReservationUser,
  insertReservation,
  deleteReservation,
  approvePayment,
};
