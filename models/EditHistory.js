const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const editHistorySchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createAt: {
      type: Date, default: Date.now 
    },
  },
);

const EditHistory = mongoose.model("EditHistory", editHistorySchema);
module.exports = EditHistory;