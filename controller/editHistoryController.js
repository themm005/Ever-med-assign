const EditHistory = require('../models/EditHistory')

exports.getUserWhoedit = async (req, res, next) => {
  try {
    const { id } = req.params
    
    if(req.user.role === 'USER') return res.json({messsage:"only ADMIN"})

    const userEdit = await EditHistory.find({ customerId: id }).populate("userId");
    res.status(200).json({ userEdit });
  } catch (err) {
    next(err);
  }
};
