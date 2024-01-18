const connection = require("../model/slqConnection");
const get_patients = async (req, res) => {
  try {
    const data = await connection.promise().query(`Select * from patients`);
    res.status(202).json({
      patients: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const post_patients = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      doctor_id,
      phone_no,
      email,
      address,
    } = req.body;

    const [{ insertId }] = await connection.promise().query(
      `insert into patients (first_name, last_name, doctor_id, phone_no, email, address)
            values (?,?,?,?,?,?)
            `,[first_name, last_name, doctor_id, phone_no, email, address]
    );

    res.status(202).json({
      message: "Patient Registered",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
    console.log(err);
  }
};

module.exports = {
  get_patients,
  post_patients,
};
