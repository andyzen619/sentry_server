var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var {
  addAppointment,
  cancelAppointment,
  changeAppointment,
  getAllAppointments,
} = require("../firebase/firebase");
const errorMessage = "There was an error with this request.";

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.get("/", (req, res) => {
  const { uid } = req.headers;
  getAllAppointments(uid)
    .get()
    .then((query) => {
      if (query.empty) {
        console.log("No matching results");
        res.send(null);
      } else {
        const appointments = [];
        query.forEach((doc) => {
          const newDocData = doc.data();
          newDocData.id = doc.id;
          appointments.push(newDocData);
        });
        res.send(appointments);
      }
    });
});

/* Add appointment to db */
router.post("/add", (req, res) => {
  const { doctor, uid, type, date } = req.body;
  addAppointment(doctor, uid, type, date)
    .then(() => {
      res.send("Appointment has been added!");
    })
    .catch((err) => {
      console.log(err);
      res.send(errorMessage);
    });
});

/**
 * Update details for appointment
 */
router.patch("/change_appointment", (req, res) => {

  const { field, new_value, appointment_id } = req.body;
  changeAppointment(field, new_value, appointment_id)
    .then(() => {
      res.send(`Appointment has been updated: ${field} => ${new_value}`);
    })
    .catch((err) => {
      console.log(err);
      res.send(errorMessage);
    });
});

module.exports = router;
