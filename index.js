// internal module
const {
  pingServer,
  getAllCarsData,
  getCarDataByID,
  createCarData,
  editCarData,
  deleteCarData,
} = require(`${__dirname}/utils/carUtils`);

// third-party module
const express = require("express");
const app = express();

const port = 8000;

app.use(express.json());

const carRoute = express.Router();

app.get("/", pingServer);

carRoute.route("/").get(getAllCarsData).post(createCarData);

carRoute
  .route("/:id")
  .get(getCarDataByID)
  .put(editCarData)
  .delete(deleteCarData);

app.use("/cars", carRoute);

app.listen(port, () => {
  console.log(`server berjalan di port ${port}`);
});
