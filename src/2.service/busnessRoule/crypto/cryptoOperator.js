import argon2, { hash } from "argon2";
import { createHmac } from "node:crypto";
import errorHandling from "../../errorHandling/errorHandling.js";

const cryptoArgon2 = {
  encrypt: async function (data) {
    const hash = await argon2.hash(data, {
      type: argon2.argon2i,
      hashLength: 512,
      // timeCost: 2,
      // memoryCost: 2000000, // em kilobits3000000
      // threads: 4,
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
const basicCript = {
  encript: async (data) => {
    console.log("> [basicCript.encrypt] Open");
    console.log("> [basicCript.encrypt] data: " + data);
    console.log(
      "> [basicCript.encrypt] data: " + process.env.SECRET_BASIC_CRYPT
    );

    const dataHashed = createHmac("sha512", process.env.SECRET_BASIC_CRYPT)
      .update(data)
      .digest("hex");

    console.log("> [basicCript.encrypt] data hashed: " + dataHashed);

    return {
      status: true,
      message: "Data has been hashed (encript) by basicCrypt",
      dataHashed: dataHashed,
    };
  },
};

export default { cryptoArgon2, basicCript };
