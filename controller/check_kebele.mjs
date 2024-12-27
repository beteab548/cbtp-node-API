import { residency } from "../models/residency.mjs";
export const checkkebeleController = async (req, res, next) => {
  const body = req.body;
  console.log(body);
  const residencyExists = await residency.findOne({
    kebeleIdNo: body.kebeleId,
  });
  if (residencyExists) {
    if (residencyExists.certificate !== "empty") {
      return res.status(400).send({ message: "certificate already exists!" });
    }
  } else {
    return res
      .status(400)
      .send({ message: "you are not a member of this kebele!" });
  }
};
