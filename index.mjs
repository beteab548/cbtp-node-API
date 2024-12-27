import express from "express";
import cors from "cors";
import { connect } from "./utils/db.mjs";
import { checkkebeleController } from "./controller/check_kebele.mjs";
const app = express();
app.use(cors());
app.use(express.json());
app.post("/api/checkResidency", checkkebeleController);
app.listen(4000, () => {
  connect();
  console.log("app listening on port 4000");
});
