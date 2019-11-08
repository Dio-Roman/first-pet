const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thingSchema = new Schema({
  id: Number,
  name: String,
  isDone: Boolean
});

const Thing = mongoose.model("thing", thingSchema);
// const Thing = mongoose.model(name, thingSchema);


module.exports = Thing;
