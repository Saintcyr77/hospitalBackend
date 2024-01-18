const express = require("express");

const app = express();
const port = process.env.PORT || 4000;
const patientRoutes = require("./routes/patientroute");
const doctorRoutes = require('./routes/doctorroute');

app.listen(port, () => {
  console.log("Priyanshu should die");
});

app.use(express.json());
app.use("/patients", patientRoutes);
app.use('/doctors', doctorRoutes);
