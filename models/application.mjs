import { model, Schema, SchemaTypes } from "mongoose";
const applicationSchema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  date_of_birth: { type: SchemaTypes.String },
  gender: { type: SchemaTypes.String },
  full_name: { type: SchemaTypes.String },
  birth_country: { type: SchemaTypes.String },
  kebele_number: { type: SchemaTypes.String },
  nationality: { type: SchemaTypes.String },
  nationality_of_father: { type: SchemaTypes.String },
  nationality_of_mother: { type: SchemaTypes.String },
  place_of_birth: { type: SchemaTypes.String },
  full_name_of_mother: { type: SchemaTypes.String },
  full_name_of_father: { type: SchemaTypes.String },
  permanent_address: { type: SchemaTypes.String },
  postal_address: { type: SchemaTypes.String },
  contact_number: { type: SchemaTypes.String },
  email: { type: SchemaTypes.String },
  image_path: { type: SchemaTypes.String },
});
export const application = model("application", applicationSchema);
