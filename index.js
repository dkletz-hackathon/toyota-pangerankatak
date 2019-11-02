const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const parkingRoutes = require('./routes/parkingRoutes');

mongoose.connect(process.env.MONGO_URI, err => {
  err && console.log("[ERROR][DB] " + err);
});
mongoose.set('useFindAndModify', false);

const app = express();
app.use(bodyParser.json());

// const ParkingLot = require("./models/ParkingLot");
// const parkingLotJSON = require("/users/stevensukma/Downloads/parkingLot.json")
// for (let i = 0; i < parkingLotJSON.length; i++) {
//   let tmp = new ParkingLot(parkingLotJSON[i]);
//   tmp.save()
// }

// import all routes
app.use('/parking', parkingRoutes);

app.listen(3000, () => console.log("App is listening at port 3000!"))