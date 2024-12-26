import { model, Schema, SchemaTypes } from "mongoose";
const userSchema = new Schema({
  FirstName: { type: SchemaTypes.String },
  LastName: { type: SchemaTypes.String },
  MobileNumber: { type: SchemaTypes.String },
  EmailAddress: { type: SchemaTypes.String },
  Password: { type: SchemaTypes.String },
});
export const User = model("user", userSchema);
