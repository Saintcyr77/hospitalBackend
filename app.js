const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 4000;
const patientRoutes = require('./routes/patientmodel');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hosdummy"
})

app.listen(port, () => {
    console.log("Priyanshu should die");
});

// connection.query('SELECT * FROM patients', (error, results, fields) => {
//   if (error) throw error;
//   console.log('Query results:', results);
// });


app.use('/patients',patientRoutes)
