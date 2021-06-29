const mongoose = require("mongoose")

// Date.prototype.addHours= function(h){
//     this.setHours(this.getHours()+h);
//     return this;
// }
// console.log((new Date().addHours(7)));

// console.log(Date.now)



const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  Gender: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  Adress: {
    type: String,
    require: true,
  },
  Status: {
    type: String,
    default:"SUBMIT",
    require: true
  },
  CreateByUserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_date: { type: Date, default: Date.now },
});


const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;