const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prepareSchema = new Schema({
  // id: Number,
  name: String,
  isDone: Boolean
});

const Prepare = mongoose.model("prepare", prepareSchema);


module.exports = Prepare;