const connection = require('../config/db')

const getAllVehicle = (page, limit, column, search, sort, keyword) => {
  return new Promise((resolve, reject) => {
    if (column !== undefined && sort !== undefined && keyword !== undefined && search !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatingResult = {}
        connection.query(`SELECT * FROM vehicle WHERE ${search} LIKE '%${keyword}%' ORDER BY ${column} ${sort} LIMIT ${limit} OFFSET ${startIndex};`, (error, result) => {
          if (!error) {
            connection.query(`SELECT COUNT(*) AS count FROM vehicle WHERE ${search} LIKE '%${keyword}%' ORDER BY ${column} ${sort}`, (errorCount, resultCount) => {
              if (!errorCount) {
                console.log(resultCount[0].count)
                if (endIndex < resultCount[0].count) {
                  paginatingResult.next = {
                    page: page + 1,
                    limit: limit
                  }
                }
                if (startIndex > 0) {
                  paginatingResult.previous = {
                    page: page - 1,
                    limit: limit
                  }
                }
                paginatingResult.result = result
                resolve(paginatingResult)
              } else {
                reject(errorCount)
              }
            })
          } else {
            reject(error)
          }
        })
      } else {
        connection.query(`SELECT * FROM vehicle ORDER BY ${column} ${sort}`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
    } else if (column !== undefined && sort !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatingResult = {}
        connection.query(`SELECT * FROM vehicle ORDER BY ${column} ${sort} LIMIT ${limit} OFFSET ${startIndex}`, (error, result) => {
          if (!error) {
            connection.query(`SELECT COUNT(*) AS count FROM vehicle ORDER BY ${column} ${sort}`, (errorCount, resultCount) => {
              if (!errorCount) {
                console.log(resultCount[0].count)
                if (endIndex < resultCount[0].count) {
                  paginatingResult.next = {
                    page: page + 1,
                    limit: limit
                  }
                }
                if (startIndex > 0) {
                  paginatingResult.previous = {
                    page: page - 1,
                    limit: limit
                  }
                }
                paginatingResult.result = result
                resolve(paginatingResult)
              } else {
                reject(errorCount)
              }
            })
          } else {
            reject(error)
          }
        })
      } else {
        connection.query(`SELECT * FROM vehicle ORDER BY ${column} ${sort}`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
    } else if (keyword !== undefined && search !== undefined) {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatingResult = {}
        connection.query(`SELECT * FROM vehicle WHERE ${search} LIKE '%${keyword}%' LIMIT ${limit} OFFSET ${startIndex}`, (error, result) => {
          if (!error) {
            connection.query(`SELECT COUNT(*) AS count FROM vehicle WHERE ${search} LIKE '%${keyword}%'`, (errorCount, resultCount) => {
              if (!errorCount) {
                console.log(resultCount[0].count)
                if (endIndex < resultCount[0].count) {
                  paginatingResult.next = {
                    page: page + 1,
                    limit: limit
                  }
                }
                if (startIndex > 0) {
                  paginatingResult.previous = {
                    page: page - 1,
                    limit: limit
                  }
                }
                paginatingResult.result = result
                resolve(paginatingResult)
              } else {
                reject(errorCount)
              }
            })
          } else {
            reject(error)
          }
        })
      } else {
        connection.query(`SELECT * FROM vehicle WHERE ${search} LIKE '%${keyword}%'`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
    } else {
      if (Number.isNaN(page) === false && Number.isNaN(limit) === false) {
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatingResult = {}
        connection.query(`SELECT * FROM vehicle LIMIT ${limit} OFFSET ${startIndex}`, (error, result) => {
          if (!error) {
            connection.query('SELECT COUNT(*) AS count FROM vehicle', (errorCount, resultCount) => {
              if (!errorCount) {
                console.log(resultCount[0].count)
                if (endIndex < resultCount[0].count) {
                  paginatingResult.next = {
                    page: page + 1,
                    limit: limit
                  }
                }
                if (startIndex > 0) {
                  paginatingResult.previous = {
                    page: page - 1,
                    limit: limit
                  }
                }
                paginatingResult.result = result
                resolve(paginatingResult)
              } else {
                reject(errorCount)
              }
            })
          } else {
            reject(error)
          }
        })
      } else {
        connection.query('SELECT * FROM vehicle', (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
    }
  })
}

const getVehicleByTypeAndCity = (page, limit, type, city, sort) => {
  return new Promise((resolve, reject) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatingResult = {};
    connection.query(
      `SELECT * FROM vehicle WHERE type = '${type}' AND city = '${city}' ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${startIndex}`,
      (error, result) => {
        if (!error) {
          connection.query(
            `SELECT COUNT(*) AS count FROM vehicle WHERE type = '${type}' AND city = '${city}'`,
            (errorCount, resultCount) => {
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
            }
          );
        } else {
          reject(error);
        }
      }
    );
  });
};

const getVehicleById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM vehicle WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const checkQuantity = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM reservation WHERE vehicleId = ? AND (status = 'waiting for payment' OR status = 'active')`, id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const insertVehicle = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO vehicle SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateVehicle = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE vehicle SET ? WHERE id = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteVehicle = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM vehicle WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

module.exports = {
  getAllVehicle,
  getVehicleById,
  getVehicleByTypeAndCity,
  insertVehicle,
  updateVehicle,
  deleteVehicle,
  checkQuantity
}
