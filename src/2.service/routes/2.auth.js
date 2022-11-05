import express from "express";
import AdmUser from "../../3.controller/class/User/3.AdmUser.js";
import jwt from "jsonwebtoken";

const auth = express.Router();

auth.post("/", async (req, res) => {
  console.log("> [route.auth]");
  const user = new AdmUser();
  const typeRequisition = req.body.type;
  //seta o cookie se colcoar login e dados do register
  if (typeRequisition == "login" || typeRequisition == "register") {
    console.log("> [route.auth] Requisition ok.");

    const operation = await user[req.body.type](req.body, res);
    console.log("> [route.auth] Result login:" + operation.status);

    if (operation.status) {
      console.log("> [route.auth] answered for to front-end.");
      const { cpf } = req.body;
      const token = jwt.sign({ id_user: cpf }, process.env.JWT_KEY);

      return res
        .cookie("access_token", token, {
          secure: true,
          sameSite: "none",
          expire: 500000,
        })
        .status(200)
        .json({ return: operation.status, message: operation.message });
    }

    return res.status(401).json({ return: operation.message });
  }
  console.log("> [route.auth] Fail requisition.");
  return res
    .status(401)
    .json({ status: false, message: "Incorrect requisition" });
});

export default auth;
