const connection = require("../model/slqConnection");

const get_all_doctors = async (req, res) => {
  try {
    const data = await connection.promise().query(`select * from doctors`);
    res.status(202).json({
      message: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const create_doctor = async (req, res) => {
  try {
    const info = req.body;
    console.log("body is" + JSON.stringify(info));

    await connection.promise().query(
      `insert into doctors (first_name,last_name,specialization,phone_no,email,address)
            
            values (?,?,?,?,?,?)`,
      [
        info.first_name,
        info.last_name,
        info.specialization,
        info.phone_no,
        info.email,
        info.address,
      ]
    );
    res.status(200).json({
      message: "Doctor created",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create Dcotor",
    });
  }
};

const get_doctor_by_id = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await connection
      .promise()
      .query(`select * from doctors where doctor_id=?`, [id]);
    res.status(202).json({
      message: data[0][0],
    });
  } catch (err) {
    res.status(500).json({
      message: "Id does not exist",
    });
  }
};

const delete_doctor = async (req, res) => {
  try {
    const { id } = req.params;

    await connection.promise().query(
      `
    delete from doctors where doctor_id=?
    `,
      [id]
    );

    res.status(200).json({
      message: "Successfully deleted",
    });

    res.status(200).json({
      message: "Succesfully Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to Delete Doctor",
    });
  }
};
const update_doctor_by_id = async (req, res) => {
  try {
    const { id } = req.params;

    const newData = req.body;

    const oldData = await connection.promise().query(
      `
        select * from doctors where doctor_id=?
        `,
      [id]
    );

    const accumulate = { ...oldData[0][0], ...newData };

    console.log("accumulated is " + accumulate);

    await connection.promise().query(
      `
        
        update doctors set first_name=?,last_name=?,specialization=?,phone_no=?,email=?,address=? where doctor_id=?
        
        `,
      [
        accumulate.first_name,
        accumulate.last_name,
        accumulate.specialization,
        accumulate.phone_no,
        accumulate.email,
        accumulate.address,
        id,
      ]
    );

    res.status(200).json({
      message: "Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to Update",
    });
  }
};
module.exports = {
  get_all_doctors,
  create_doctor,
  get_doctor_by_id,
  delete_doctor,
  update_doctor_by_id,
};
