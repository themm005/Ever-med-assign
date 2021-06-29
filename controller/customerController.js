const Customer = require('../models/Customer')
const EditHistory = require('../models/EditHistory')

exports.getAllCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.find({}).populate("CreateByUserID");
    res.status(200).json({ customer });
  } catch (err) {
    next(err);
  }
};

exports.createNewCustomer = async (req, res, next) => {
  try {
    const { name, lastName, Gender, phonNumber, Adress, Status } = req.body
    
    const newCustomer = await Customer.create({
      name,
      lastName,
      Gender,
      phonNumber,
      Adress,
      Status,
      CreateByUserID:req.user.id
    }); 
    res.status(200).json({newCustomer})
  } catch (err) {
    next(err)
  }
}

exports.getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params
    
    const customer = await Customer.findOne({ _id: id })
    res.status(200).json({ customer });
  } catch (err) {
    next(err)
  }
}

exports.editCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {name,
      lastName,
      Gender,
      Adress} = req.body

    const editCustomer = await Customer.updateOne(
      { _id: id },
      {
        name,
        lastName,
        Gender,
        Adress
      }
    );
    const editHistory = await EditHistory.create({
      customerId: id,
      userId: req.user.id
      
    });
    res.status(200).json({ editCustomer });
  } catch (err) {
    
  }
}

exports.deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteCustomer = await Customer.deleteOne({_id:id})
    res.status(200).json({deleteCustomer})
  } catch (err) {
    next(err)
  }
}

exports.changeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Status } = req.body
    
        if (req.user.role === "USER")
          return res.json({ messsage: "only ADMIN" });


    const changStatus = await Customer.updateOne({ _id: id }, {
      Status
    });
    res.status(200).json({ changStatus });
  } catch (err) {
        next(err);

  }
}