const { json } = require("express");
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
            `,
      [first_name, last_name, doctor_id, phone_no, email, address]
    );

    res.status(202).json({
      message: "Patient Registered",
      insertId: insertId,
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
