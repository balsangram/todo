const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    // gender: Boolean,
    Gender: { type: String, enum: ["Homme", "Femme"] },
    list: [
      {
        type: mongoose.Types.ObjectId,
        ref: "list",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
