const connection = require('../config/db');

const getAllReservation = (page, limit, column, search, sort, keyword) => {
  return new Promise((resolve, reject) => {
    if (column !== undefined && sort !== undefined && keyword !== undefined && search !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatingResult = {};
        connection.query(
          `SELECT * FROM reservation WHERE ${search} LIKE '%${keyword}%' ORDER BY ${column} ${sort} LIMIT ${limit} OFFSET ${startIndex};`,
          (error, result) => {
            if (!error) {
              connection.query('SELECT COUNT(*) AS count FROM reservation', (errorCount, resultCount) => {
                if (!errorCount) {
                  console.log(resultCount[0].count);
                  if (endIndex < resultCount[0].count) {
                    paginatingResult.next = {
                      page: page + 1,
                      limit: limit,
                    };
                  }
                  if (startIndex > 0) {
                    paginatingResult.previous = {
                      page: page - 1,
                      limit: limit,
                    };
                  }
                  paginatingResult.result = result;
                  resolve(paginatingResult);
                } else {
                  reject(errorCount);
                }
              });
            } else {
              reject(error);
            }
          }
        );
      } else {
        connection.query(`SELECT * FROM reservation ORDER BY ${column} ${sort}`, (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        });
      }
    } else if (column !== undefined && sort !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatingResult = {};
        connection.query(
          `SELECT * FROM reservation ORDER BY ${column} ${sort} LIMIT ${limit} OFFSET ${startIndex}`,
          (error, result) => {
            if (!error) {
              connection.query('SELECT COUNT(*) AS count FROM reservation', (errorCount, resultCount) => {
                if (!errorCount) {
                  console.log(resultCount[0].count);
                  if (endIndex < resultCount[0].count) {
                    paginatingResult.next = {
                      page: page + 1,
                      limit: limit,
                    };
                  }
                  if (startIndex > 0) {
                    paginatingResult.previous = {
                      page: page - 1,
                      limit: limit,
                    };
                  }
                  paginatingResult.result = result;
                  resolve(paginatingResult);
                } else {
                  reject(errorCount);
                }
              });
            } else {
              reject(error);
            }
          }
        );
      } else {
        connection.query(`SELECT * FROM reservation ORDER BY ${column} ${sort}`, (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        });
      }
    } else if (keyword !== undefined && search !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatingResult = {};
        connection.query(
          `SELECT * FROM reservation WHERE ${search} LIKE '%${keyword}%' LIMIT ${limit} OFFSET ${startIndex}`,
          (error, result) => {
            if (!error) {
              connection.query('SELECT COUNT(*) AS count FROM reservation', (errorCount, resultCount) => {
                if (!errorCount) {
                  console.log(resultCount[0].count);
                  if (endIndex < resultCount[0].count) {
                    paginatingResult.next = {
                      page: page + 1,
                      limit: limit,
                    };
                  }
                  if (startIndex > 0) {
                    paginatingResult.previous = {
                      page: page - 1,
                      limit: limit,
                    };
                  }
                  paginatingResult.result = result;
                  resolve(paginatingResult);
                } else {
                  reject(errorCount);
                }
              });
            } else {
              reject(error);
            }
          }
        );
      } else {
        connection.query(`SELECT * FROM reservation WHERE ${search} LIKE '%${keyword}%'`, (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        });
      }
    } else {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatingResult = {};
        connection.query(`SELECT * FROM reservation LIMIT ${limit} OFFSET ${startIndex}`, (error, result) => {
          if (!error) {
            connection.query('SELECT COUNT(*) AS count FROM reservation', (errorCount, resultCount) => {
              if (!errorCount) {
                console.log(resultCount[0].count);
                if (endIndex < resultCount[0].count) {
                  paginatingResult.next = {
                    page: page + 1,
                    limit: limit,
                  };
                }
                if (startIndex > 0) {
                  paginatingResult.previous = {
                    page: page - 1,
                    limit: limit,
                  };
                }
                paginatingResult.result = result;
                resolve(paginatingResult);
              } else {
                reject(errorCount);
              }
            });
          } else {
            reject(error);
          }
        });
      } else {
        connection.query(
          'SELECT reservation.id as reservationId, reservation.status, reservation.bookingCode, vehicle.img, vehicle.city, reservation.quantity, reservation.paymentMethod, reservation.paymentCode, vehicle.prepayment, vehicle.name AS vehicleName, reservation.createdAt AS reservationDate, reservation.returnAt, vehicle.price, reservation.totalPayment, user.name as userName, user.email, user.phone from reservation INNER JOIN user INNER JOIN vehicle WHERE user.id = reservation.userIdBorrower AND vehicle.id = reservation.vehicleId',
          (error, result) => {
            if (!error) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
      }
    }
  });
};
const getReservationById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT reservation.id as reservationId, reservation.status, reservation.bookingCode, vehicle.img, vehicle.city, reservation.quantity, reservation.paymentMethod, reservation.paymentCode, vehicle.prepayment, vehicle.name AS vehicleName, reservation.createdAt AS reservationDate, reservation.returnAt, vehicle.price, reservation.totalPayment, user.name as userName, user.email, user.phone from reservation INNER JOIN user INNER JOIN vehicle WHERE reservation.id = ? AND reservation.userIdBorrower = user.id AND reservation.vehicleId = vehicle.id',
      id,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const getReservationUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT reservation.id as reservationId, reservation.status, reservation.bookingCode, vehicle.img, 
      vehicle.city, reservation.quantity, reservation.paymentMethod, reservation.paymentCode, vehicle.prepayment, 
      vehicle.name AS vehicleName, reservation.createdAt AS reservationDate, reservation.returnAt, vehicle.price, 
      reservation.totalPayment, user.name as userName, user.email, user.phone, reservation.userIdBorrower 
      from reservation INNER JOIN user INNER JOIN vehicle WHERE user.id LIKE '${id}' 
      AND reservation.userIdBorrower LIKE '${id}' AND vehicle.id = reservation.vehicleId`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const insertReservation = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO reservation SET ?', data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const deleteReservation = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM reservation WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
const approvePayment = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE reservation SET status="active" WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const changeStatusReservation = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE reservation SET status="expired" WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
module.exports = {
  getAllReservation,
  getReservationById,
  getReservationUser,
  insertReservation,
  deleteReservation,
  approvePayment,
  changeStatusReservation
};
