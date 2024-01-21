const { json } = require("express");
const connection = require("../model/slqConnection");
const get_patients = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const offset = (page - 1) * limit;
    console.log(page, limit);
    const data = await connection
      .promise()
      .query(`Select * from patients limit ? offset ?`, [+limit, +offset]);
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
    let dateTime = new Date();
    const [{ insertId }] = await connection.promise().query(
      `insert into patients (first_name, last_name, doctor_id, phone_no, email, address,created_at,created_time)
            values (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)
            `,
      [first_name, last_name, doctor_id, phone_no, email, address, dateTime]
    );
    console.log(`insert id is ${insertId}`);
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

const get_patient_by_id = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await connection
      .promise()
      .query(`select * from patients where patient_id=?`, [id]);

    res.status(202).json({
      patient: data[0][0],
    });
  } catch (err) {
    res.status(500).json({
      message: "Pateint not found",
    });
  }
};

const update_patient_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const currentData = await connection
      .promise()
      .query(`select * from patients where patient_id=?`, [id]);

    if (currentData.length === 0) {
      res.status(404).json({
        message: "Patient not found",
      });
    }
    const newData = { ...currentData[0][0], ...updatedData }; // updated data properties will overlap currentData if same properties
    console.log(JSON.stringify(newData), "This is my new data");

    const upVal = await connection.promise().query(
      `update patients set 
         first_name=?,
         last_name=?,
         doctor_id=?,
         phone_no=?,
         email=?,
         address=?
         where patient_id=? `,
      [
        newData.first_name,
        newData.last_name,
        newData.doctor_id,
        newData.phone_no,
        newData.email,
        newData.address,
        id,
      ]
    );

    res.status(202).json({
      message: "Patient information updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const delete_patient = async (req, res) => {
  try {
    const id = req.params;

    const update = await connection
      .promise()
      .query(`delete from patients where patient_id=?`, [id]);

    res.status(202).json({
      message: "Deleted patient record",
    });
    res.session.destroy();
  } catch (err) {
    res.status(500).json({
      message: "Terminated",
    });
  }
};
module.exports = {
  get_patients,
  post_patients,
  get_patient_by_id,
  delete_patient,
  update_patient_by_id,
};
