import argon2, { hash } from "argon2";
import errorHandling from "../../errorHandling/errorHandling.js";
const { createHmac } = await import("node:crypto");

const cryptoArgon2 = {
  encrypt: async (data) => {
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

  verify: async (pass, longHash) => {
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
