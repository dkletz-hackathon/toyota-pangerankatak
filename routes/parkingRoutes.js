const express = require("express");
const router = express.Router();

const ParkingLot = require("../models/ParkingLot");

router.get(
  "/",
  async (req, res, next) => {
    try {
      let parkinglots = await ParkingLot.find().lean();
      const newParkingLots = parkinglots.map(parkinglot => ({
        ...parkinglot,
        id: parkinglot._id,
      }))

      res.json({
        success: true,
        data: newParkingLots,
      })
    } catch(err) {
      console.log("[Error][Parking] " + err)
      next(err)
    }
});

router.get(
  "/:parkingLotId",
  async (req, res, next) => {
    let { parkingLotId } = req.params;

    try {
      let parkingLot = await ParkingLot.findById(parkingLotId);

      res.json({
        success: true,
        data: parkingLot,
      })
    } catch(err) {
      console.log("[Error][Parking] " + err)
      next(err)
    }
  }
)

router.patch(
  "/:parkingLotId/empty",
  async (req, res, next) => {
    let { parkingLotId } = req.params;
    let { spaces } = req.body;

    try {
      const newStatusMap = {}
      for (let i = 0; i < spaces.length; i++) {
        newStatusMap[spaces[i]["_id"]] = spaces[i]["empty"];
      }

      let parkingLot = await ParkingLot.findById(parkingLotId);
      if (parkingLot["spaces"]) {
        for (let i = 0; i < parkingLot["spaces"].length; i++) {
          parkingLot["spaces"][i]["empty"] = newStatusMap[parkingLot["spaces"][i]["_id"]]
        }
      }

      parkingLot = await parkingLot.save()

      res.json({
        success: true,
      })
    } catch(err) {
      console.log("[Error][Parking] " + err)
      next(err)
    }
  }
)

module.exports = router;