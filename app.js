const express = require('express');

const app = express();
const port = process.env.PORT || 4000;
const patientRoutes = require('./routes/patientmodel');



app.listen(port, () => {
    console.log("Priyanshu should die");
});




app.use('/patients',patientRoutes)
