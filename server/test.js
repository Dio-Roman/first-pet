const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  // id: Number,
  name: String,
  isDone: Boolean,
  type: String
});

const Test = mongoose.model("testnew", testSchema);


module.exports = Test;