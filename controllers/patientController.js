
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hosdummy"
})
const get_patients = async (req, res) => {
    try {
        const data = await connection.promise().query(
            `Select * from patients`
        )
        res.status(202).json({
            patients: data[0]
        })
    }
    catch (err) {
        res.status(500).json({
            message: err
        })
    }
   
}

module.exports = {
    get_patients
}