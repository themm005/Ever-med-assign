require('dotenv').config();
const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology:true
    })

    console.log("mongo is connected !")
  } catch (error) {
    console.error("mongo is fail connected!");
    process.exit(1)
  }
} 

module.exports = connectDb;