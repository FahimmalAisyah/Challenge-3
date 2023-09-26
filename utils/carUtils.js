const fs = require("fs");

const dataPath = `${__dirname}/../data/cars.json`;
const carList = JSON.parse(fs.readFileSync(dataPath));

const pingServer = (req, res) => {
  res.status(200).json({
    message: "ping succesfully",
  });
};

const getAllCarsData = (req, res) => {
  if (!carList) {
    return res.json({
      status: "failed",
      message: "data tidak ditemukan",
    });
  }
  res.json({
    status: "success",
    data: carList,
  });
};

const getCarDataByID = (req, res) => {
  const findCarByID = carList.find((car) => car.id == req.params.id);
  if (findCarByID) {
    res.status(200).json({
      status: "success",
      data: findCarByID,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "id mobil tidak ditemukan",
    });
  }
};

const createCarData = (req, res) => {
  const newCar = req.body;

  for (const car of carList) {
    if (car.plate === newCar.plate) {
      return res.status(409).json({
        status: "failed",
        message: "plat nomor yang diberikan sudah terdaftar",
      });
    }
  }

  carList.push(newCar);
  fs.writeFile(dataPath, JSON.stringify(carList), (err) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        message: "Error ketika menulis data ke file json",
      });
    }
    res.status(201).json({
      status: "success",
      data: newCar,
    });
  });
};

const editCarData = (req, res) => {
  const carId = req.params.id;
  const updatedCar = req.body;
  const index = carList.findIndex((car) => car.id === carId);

  if (index !== -1) {
    carList[index] = updatedCar;
    fs.writeFile(dataPath, JSON.stringify(carList), (err) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: "gagal menulis data ke dalam file json",
        });
      }
      res.status(200).json({
        status: "success",
        data: updatedCar,
      });
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "id mobil yang diberikan tidak ditemukan!",
    });
  }
};

const deleteCarData = (req, res) => {
  const carId = req.params.id;
  const index = carList.findIndex((car) => car.id === carId);
  if (index !== -1) {
    const deletedCar = carList.splice(index, 1)[0];
    fs.writeFile(dataPath, JSON.stringify(carList), (err) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: "gagal menulis data ke dalam file json",
        });
      }
      res.status(200).json({
        status: "success",
        data: deletedCar,
      });
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "id yang diberikan tidak ditemukan",
    });
  }
};

module.exports = {
  pingServer,
  getAllCarsData,
  getCarDataByID,
  createCarData,
  editCarData,
  deleteCarData,
};
