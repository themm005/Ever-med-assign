require('dotenv').config()

const customerData = require('./data/customerdata')
const userData = require('./data/Userdata')
const connectDb = require('./database/db')
const Customer = require('./models/Customer')
const User = require('./models/User')

connectDb()

const importData = async () => {
  try {
    
    await Customer.deleteMany({})
    await User.deleteMany({})

    await Customer.insertMany(customerData)
    await User.insertMany(userData)

    console.log("data imported ")
  } catch (error) {
    console.error("Fail to import data")
    process.exit(1)
  }
}

importData()