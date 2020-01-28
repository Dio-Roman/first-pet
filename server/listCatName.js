const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listCatNameSchema = new Schema({
  // id: Number,
  name: String,
  // isDone: Boolean
});

const ListCatName = mongoose.model("listcatname", listCatNameSchema);
// const Thing = mongoose.model(name, thingSchema);


module.exports = ListCatName;
