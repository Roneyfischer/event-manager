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

      return hash;
    } catch (error) {
      return errorHandling(error.message);
    }
  },

  verify: async function (pass, longHash) {
    try {
      if (await argon2.verify(longHash, pass)) {
        console.log("> [cryptoOperator] Password match");
        return { status: true, message: "Password match" };
      } else {
        onsole.log("> [cryptoOperator] Password do not match");
        throw { status: false, message: "Password did not match" };
      }
    } catch (error) {
      throw error;
    }
  },
};

export default cryptoArgon2;
