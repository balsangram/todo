const mongoose = require("mongoose");
const listSchema = new mongoose.Schema(
  {
    // title: {
    //   type: String,
    //   required: true,
    // },
    body: {
      type: String,
      require: true,
    },
    creatTime: {
      type: Date,
      default: Date.now,
    },
    // compliteTime: {
    //   type: Date,
    //   default: Date.now,
    // },
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);
module.exports = List;
