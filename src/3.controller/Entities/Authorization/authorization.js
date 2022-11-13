import StandardUser from "../User/1.StandardUser.js";
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
        .json({ status: false, message: `Error on verifty token$: ${err}` });
    }
    return next();
  });
};

const userDriver = {
  standard: async (reqBody) => {
    try {
      console.log("> [authorization.standard]");

      const user = new StandardUser(reqBody);

      const executeRequisition = await user[reqBody.type](reqBody);

      return executeRequisition;
    } catch (error) {
      return {
        status: false,
        message: `Ops, seu usuário (${reqBody.role}) não tem pemissão pra executar essa função (${reqBody.type})`,
      };
    }

    //continuar
  },
  guest: async (reqBody) => {
    try {
      console.log("> [authorization.standard]");

      const user = new GuestUser(reqBody);

      const executeRequisition = await user[reqBody.type](reqBody);

      return executeRequisition;
    } catch (error) {
      return {
        status: false,
        message: `Ops, seu usuário (${reqBody.role}) não tem pemissão pra executar essa função (${reqBody.type})`,
      };
    }

    //continuar
  },

  adm: async (reqBody) => {
    try {
      const user = new AdmUser(reqBody);
      console.log("> [authorization.adm] >>>>>>>>>>>>>>>" + user[reqBody.type]);
      const executeRequisition = await user[reqBody.type](reqBody);

      return executeRequisition;
    } catch (error) {
      return {
        status: false,
        message: `Ops, seu usuário (${reqBody.role}) não tem pemissão pra executar essa função (${reqBody.type}): ${error}`,
      };
    }
  },

  master: async (reqBody) => {
    console.log("> [authorization.master]");
    try {
    } catch (error) {
      return {
        status: false,
        message: `Ops, seu usuário (${reqBody.role}) não tem pemissão pra executar essa função (${reqBody.type})`,
      };
    }

    //continuar
  },
};

export default { verifyJWT, userDriver };
