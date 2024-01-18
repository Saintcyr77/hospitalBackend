const connection = require('../model/slqConnection')
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