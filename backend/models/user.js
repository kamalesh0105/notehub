const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      default: "Employee",
    },
  ],

  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
