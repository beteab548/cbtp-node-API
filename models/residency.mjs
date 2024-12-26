import { model, Schema, SchemaTypes } from "mongoose";
const residencySchema = new Schema({
  kebeleIdNo: { type: SchemaTypes.String },
  address: { type: SchemaTypes.String },
  name: { type: SchemaTypes.String },
  mobileNo: { type: SchemaTypes.String },
});
export const residency = model("residency", residencySchema);
