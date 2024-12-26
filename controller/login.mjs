import mongoose from "mongoose";
import { z } from "zod";
import { application } from "../models/application.mjs";
import { User } from "../models/users.mjs";
const formSchema = z.object({
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(
    ["Male", "Female"],
    "Gender must be either 'Male' or 'Female'"
  ),
  fname: z
    .string()
    .min(4, "Full Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Full name must only contain letters and spaces"),
  bc: z
    .string()
    .min(1, "Birth Country is required")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Birth Country must only contain letters and spaces"
    ),
  kebeleId: z
    .string()
    .length(10, "Kebele ID must be exactly 10 digits")
    .regex(/^\d{10}$/, "Kebele ID must contain only digits"),
  ntn: z
    .string()
    .min(1, "Nationality is required")
    .regex(/^[a-zA-Z\s]+$/, "Nationality must only contain letters and spaces"),
  ntnf: z
    .string()
    .min(1, "Nationality of Father is required")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Father's Nationality must only contain letters and spaces"
    ),
  mother: z
    .string()
    .min(1, "Mother's Nationality is required")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Mother's Nationality must only contain letters and spaces"
    ),
  pob: z
    .string()
    .min(1, "Place of Birth is required")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Place of Birth must only contain letters and spaces"
    ),
  nameofmother: z
    .string()
    .min(1, "Full Name of Mother is required")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Mother's Name must only contain letters and spaces"
    ),
  nameoffather: z
    .string()
    .min(1, "Full Name of Father is required")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Father's Name must only contain letters and spaces"
    ),
  padd: z.string().min(1, "Permanent Address is required"),
  postaladd: z.string().optional(),
  mobnumber: z
    .string()
    .length(10, "Contact number must be 10 digits")
    .regex(/^\d{10}$/, "Contact number must contain only digits"),
  email: z.string().email("Invalid email format"),
  file: z
    .string()
    .min(1, "File is required")
    .regex(/\.(pdf)$/, "Only PDF files are allowed"),
});

export const loginVadlidation = async (req, res, next) => {
  const body = req.body;
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
export const newApplicationController = async (req, res, next) => {
  const body = req.body;
  try {
    formSchema.parse(body);
    if (body.file) {
      const userObjectID = new mongoose.Types.ObjectId(body.uid);
      const applicationExists = await application.findOne({
        userId: userObjectID,
      });
      if (applicationExists === null) {
        await application.create({
          userId: body.uid,
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
        return res
          .status(200)
          .json({ message: "successfully save the application form!" });
      } else {
        console.log("returning 400 from application already esxisting");
        return res.status(400).json({
          message: "Application already exists please check your detail!",
        });
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation errors
      console.error("Validation failed:", error.errors);
      const errorArray = [];
      // Loop through the validation errors
      error.errors.forEach((err) => {
        // Extract the path (field name), message, and error type
        const field = err.path[0]; // This gives you the name of the field (e.g., 'dob', 'fname')
        const message = err.message; // This is the error message
        errorArray.push(message);
      });
      console.log("returning 400 from catching invalid data!");
      return res.status(400).json({ message: errorArray });
    }
  }
};
export const getApplicationData = async (req, res, next) => {
  const query = req.query.userId;
  const userObjectID = new mongoose.Types.ObjectId(query);
  const getApplication = await application.findOne({ userId: userObjectID });
  if (query.userId) {
    return res
      .status(200)
      .json({ message: "successfully fetched the application form!" });
  } else {
    return res
      .status(400)
      .json({ message: "error sending the application form!" });
  }
};
