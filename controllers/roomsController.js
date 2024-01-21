const connection = require("../model/slqConnection");

const ger_all_rooms = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const offset = (page - 1) * limit;
    const data = await connection.promise().query(
      `
        select * from rooms limit ? offset ?
        `,
      [+limit, +offset]
    );

    res.status(202).json({
      message: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: "Error Getting Rooms",
    });
  }
};

const create_room = async (req, res) => {
  try {
    const bod = req.body;
    console.log(`body is ${JSON.stringify(bod)}`);

    await connection.promise().query(
      `
        insert into rooms (room_no,room_type,room_cost)

        values (?,?,?)
        `,
      [bod.room_no, bod.room_type, bod.room_cost]
    );

    res.status(202).json({
      message: "Room Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed To Create Room",
    });
  }
};

const update_room_no = async (req, res) => {
  try {
    const { id } = req.params;

    const newData = req.body;
    console.log(newData);
    const oldData = await connection.promise().query(
      `
        
        select room_no from rooms where room_id=?
        `,
      [id]
    );

    console.log(oldData[0][0]);
    const accumulate = { ...oldData[0][0], ...newData };

    console.log(`accumulate value is ${JSON.stringify(accumulate)}`);

    const bod = await connection.promise().query(
      `
           update rooms set room_no=? where room_id=?

        `,
      [accumulate.room_no, id]
    );

    res.status(202).json({
      message: "Room updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update the room",
    });
  }
};

const update_room_cost = async (req, res) => {
  try {
    const { id } = req.params;

    const newCost = req.body;

    const oldCost = await connection.promise().query(
      `
   select room_cost from rooms where room_id=?
  `,
      [id]
    );

    const accumulate = { ...oldCost, ...newCost };

    await connection.promise().query(
      `
   update rooms set room_cost=? where room_id=?
  `,
      [accumulate.room_cost, id]
    );

    res.status(202).json({
      message: "Cost updated successfully you thieving bastards",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update room cost",
    });
  }
};

module.exports = {
  ger_all_rooms,
  create_room,
  update_room_no,
  update_room_cost,
};
