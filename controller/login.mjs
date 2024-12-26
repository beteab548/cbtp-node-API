import { application } from "../models/application.mjs";
import { User } from "../models/users.mjs";
export const loginVadlidation = async (req, res, next) => {
  const body = req.body;
  console.log("incoming body:", body);
  const userExists = await User.findOne({
    MobileNumber: body.mobno,
    Password: body.password,
  });
  if (userExists) {
    return res.status(200).json({ userId: userExists._id });
  } else {
    return res.status(400).json({ message: "Invalid Credentials." });
  }
};
export const registerController = async (req, res, next) => {
  console.log("in the register middleware!");
  const body = req.body;
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
export const newApplicationController = (req, res, next) => {
  const body = req.body;
  if (body.file) {
    //if the validation is correct
    const newApplication = application.create({
      date_of_birth: body.dob,
      gender: body.gender,
      full_name: body.fname,
      birth_country: body.bc,
      kebele_number: body.kebeleId,
      nationality: body.ntn,
      nationality_of_father: body.ntnf,
      nationality_of_mother: body.mother,
      place_of_birth: body.pob,
      full_name_of_mother: body.nameofmother,
      full_name_of_father: body.nameoffather,
      permanent_address: body.padd,
      postal_address: body.postaladd,
      contact_number: body.mobnumber,
      email: body.email,
      image_path: body.file,
    });
    console.log(newApplication);
    return res
      .status(200)
      .json({ message: "successfully save the application form!" });
  } else {
    return res
      .status(400)
      .json({ message: "error sending the application form!" });
  }
};
export const getApplicationData = (req, res, next) => {
  const body = req.body;
  //here i will accept the userid and check it with the application database and if the user application exists then i will send the datas needed
  // i need to create a application model to check the userId
  if (body.userId) {
    return res
      .status(200)
      .json({ message: "successfully save the application form!" });
  } else {
    return res
      .status(400)
      .json({ message: "error sending the application form!" });
  }
};
