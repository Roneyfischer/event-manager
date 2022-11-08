import argon2, { hash } from "argon2";
import errorHandling from "../../errorHandling/errorHandling.js";

const cryptoArgon2 = {
  encrypt: async function (data) {
    const hash = await argon2.hash(data, {
      type: argon2.argon2i,
      // hashLength: 512,
      // timeCost: 450,
      // memoryCost: 65536,
    });

    return hash;

    throw { status: false, message: error.message };
  },

  verify: async function (pass, longHash) {
    if (await argon2.verify(longHash, pass)) {
      console.log("> [cryptoOperator] Password match");
      return { status: true, message: "Password match" };
    }

    throw { status: false, message: "Password did not match" };
  },
};

export default cryptoArgon2;
