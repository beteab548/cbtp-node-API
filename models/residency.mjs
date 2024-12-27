import { model, Schema, SchemaTypes } from "mongoose";
const residencySchema = new Schema({
  kebeleIdNo: { type: SchemaTypes.String },
  address: { type: SchemaTypes.String },
  name: { type: SchemaTypes.String },
  mobileNo: { type: SchemaTypes.String },
  certificate: { type: SchemaTypes.String, default: "empty" },
});
export const residency = model("residency", residencySchema);
