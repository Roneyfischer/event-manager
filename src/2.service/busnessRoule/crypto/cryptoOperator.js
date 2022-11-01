import argon2, { hash } from "argon2";
import errorHandling from "../../errorHandling/errorHandling.js";

const cryptoArgon2 = {
  encrypt: async function (data) {
    try {
      const hash = await argon2.hash(data, {
        type: argon2.argon2i,
        // hashLength: 512,
        // timeCost: 450,
        // memoryCost: 65536,
      });

      return `user has been authenticate` + hash;
    } catch (error) {
      return errorHandling(error.message);
    }
  },

  verify: async function (pass, longHash) {
    try {
      
      if (await argon2.verify(longHash, pass)) {
        return { status: true, message: "String match" };
      } else {
        return { status: false, message: "String did not match" };
      }
    } catch (error) {
      console.log("Erro aqui");
      return { status: false, message: errorHandling(error.message) };
    }
  },
};

export default cryptoArgon2;
