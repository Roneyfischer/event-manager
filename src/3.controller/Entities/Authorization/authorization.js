import GuestUser from "../User/2.GuestUser.js";
import AdmUser from "../User/3.AdmUser.js";
import MasterUser from "../User/5.MasterUser.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  const token = req.headers["access_token"];

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.status(401).end();

    req.body.singularUserId = decoded.singularUserId;
    req.body.role = decoded.role;

    if (err) {
      return res
        .status(401)
        .json({ status: false, msg: `Error on verifty token$: ${err}` });
    }
    return next();
  });
};

const userDriver = {
  standard: async (reqBody) => {
    console.log("> [authorization.standard]");
    //continuar
  },

  adm: async (reqBody) => {
    console.log("> [authorization.adm]");
    const admUser = new AdmUser(reqBody);

    const executeRequisition = await admUser[reqBody.type](reqBody);

    return executeRequisition;
  },

  master: async (reqBody) => {
    console.log("> [authorization.master]");
    //continuar
  },
};

export default { verifyJWT, userDriver };
