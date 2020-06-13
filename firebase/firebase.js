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
const addAppointment = (doctor, user, type) => {
  return appointments.add({
    date: FieldValue.serverTimestamp(),
    doctor: doctor,
    type: type,
    user: user,
    cancel: false,
  });
};

/**
 * Cancel appointment for user.
 * @param {*} appointmentId The document ID for appointment in db.
 */
const cancelAppointment = (appointmentId) => {
  appointments
    .doc(appointmentId)
    .update({ cancel: true })
    .then(() => {
      console.log("Appointment has been cancelled");
    });
};

/**
 * Change details about appointment.
 * @param {*} field
 * @param {*} newValue
 */
const changeAppointment = (field, newValue, appointmentId) => {
  const updatedDetails = {};
  updatedDetails[field] = newValue;
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

module.exports = { addAppointment, cancelAppointment, changeAppointment, getAllAppointments };
