const User = require('../models/User')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.protect = async (req, res, next) => {
  try {
    let token = null;
     if (
       req.headers.authorization &&
       req.headers.authorization.startsWith("Bearer")
     )
       token = req.headers.authorization.split(" ")[1];

     if (!token)
       return res.status(401).json({ message: "you are unauthorized" });

     const payload = jwt.verify(token, process.env.JWT_SECRET);
     const user = await User.findOne({  _id: payload.id  });
     if (!user) return res.status(400).json({ message: "user not found" });
     req.user = user;
     next();
  } catch (err) {
    next(err)
  }
}



exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username:username });
    if (!user)
      return res
        .status(400)
        .json({ message: "username or password incorrect" });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "username or password incorrect" });
    const payload = {
      id: user.id,
      name: user.firstName,
      lastName: user.lastName,
      username:user,username,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ token });
    console.log(req);
  } catch (err) {
    next(err);
  }
};


exports.register = async(req, res, next) => {
  try {
    const { name, lastName, username, password, confirmPassword, role } =
      req.body;
    if (password !== confirmPassword)
      return res.status(400).json({ message: "password not match" });
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BCRYPT_SALT
    );
    const user = await User.create({
      name,
      lastName,
      username,
      password: hashedPassword,
      role
    });
    const payload = {
      id: user.id,
      name,
      lastName,
      username,
      role,
    };
     const token = jwt.sign(payload, process.env.JWT_SECRET, {
       expiresIn: +process.env.JWT_EXPIRES_IN,
     });
     res.status(201).json({ token });
  } catch (err) {
    next(err)
  }
}