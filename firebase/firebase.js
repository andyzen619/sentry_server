var admin = require("firebase-admin");

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://health-scheduler-server.firebaseio.com",
});

let db = admin.firestore();
let FieldValue = admin.firestore.FieldValue;
const appointments = db.collection("appointments");

/**
 * Add Appointment to db
 * @param {*} doctor
 * @param {*} user
 * @param {*} type
 */
const addAppointment = (doctor, uid, type, date) => {

  console.log(date)
  return appointments.add({
    date: date,
    doctor: doctor,
    type: type,
    user: uid,
    status: '1'
  });
};


/**
 * Change details about appointment.
 * @param {*} field
 * @param {*} newValue
 */
const changeAppointment = (field, newValue, appointmentId) => {;
  console.log(newValue)
  const updatedDetails = {};
  updatedDetails[field] = newValue;
  console.log(updatedDetails);
  return appointments
    .doc(appointmentId)
    .update(updatedDetails)
};

/**
 * Get all appointments for user.
 * @param {*} uid The unique UID of user.
 */
const getAllAppointments = (uid) => {
  return appointments.where('user', '==', uid)
}

module.exports = { addAppointment, changeAppointment, getAllAppointments };
