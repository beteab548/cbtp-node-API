import { User } from "../models/users.mjs";
export const loginVadlidation = async (req, res, next) => {
  const body = req.body;
  console.log("incoming body:", body);
  const userExists = await User.findOne({
    MobileNumber: body.mobno,
    Password: body.password,
  });
  console.log("existing user:", userExists);
  if (userExists) {
    return res.status(200).json({ userId: userExists._id });
  } else {
    return res.status(400).json({ message: "Invalid Credentials." });
  }
};
export const registerController = async (req, res, next) => {
  console.log("in the register middleware!");
  const body = req.body;
  console.log(body);
  const user = await User.create({
    FirstName: body?.fname,
    LastName: body?.lname,
    Password: body?.password,
    EmailAddress: body?.address,
    MobileNumber: body?.mobno,
  });
  if (user) {
    return res
      .status(200)
      .json({ message: "user registed successfully!", status: "success" });
  } else {
    return res
      .status(400)
      .json({ message: "Error Creating user", status: "error" });
  }
};
