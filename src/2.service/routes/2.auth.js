import express from "express";
import AdmUser from "../../3.controller/class/User/3.AdmUser.js";
import jwt from "jsonwebtoken";

const auth = express.Router();

auth.post("/", async (req, res) => {
  console.log("Passando por: rota /auth");
  const user = new AdmUser();
  const typeRequisition = req.body.type;
  //seta o cookie se colcoar login e dados do register
  if (typeRequisition == "login" || typeRequisition == "register") {
    const loginFunction = await user[req.body.type](req.body, res);
    console.log("Status do login: " + loginFunction.status);

    if (loginFunction.status) {
      console.log("Entrou no IF loginFunction.status");
      const { cpf } = req.body;
      const token = jwt.sign({ id_user: cpf }, process.env.JWT_KEY);

      return res
        .cookie("access_token", token, {
          secure: true,
          sameSite: "none",
          expire: 500000,
        })
        .status(200)
        .json({ return: loginFunction.status });
    }
    res.status(401).json({ return: loginFunction });
  }
  res.status(401).json({ status: false, message: "requisição incorreta" });
});

export default auth;
