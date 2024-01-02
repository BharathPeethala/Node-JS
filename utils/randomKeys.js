import crypto from "crypto";

function generateKeys() {
  const key = crypto.randomBytes(64).toString("hex");
  return key;
}

export { generateKeys };
