import express from "express";
import loginRoutes from "./routes/login.mjs";
import { connect } from "./utils/db.mjs";
const app = express();
app.use(express.json());
app.use("/api", loginRoutes);
app.listen(4000, () => {
  connect();
  console.log("app listening on port 4000");
});
