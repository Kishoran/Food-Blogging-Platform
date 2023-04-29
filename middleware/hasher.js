import crypto from "crypto";
const Num_rehash = 2;

export const createPassHash = (password) => {
  try {
    const salt = Math.random().toString().substring(0, 8);
    password += salt;
    //re_hash the hashed password 10000 times
    for (let i = 0; i < Num_rehash; i++) {
      password = crypto.createHash("sha512").update(password).digest("hex");
    }
    return { password, salt };
  } catch (error) {
  }
};

export const validatePassHash = (password, salt, confirmPassword) => {
  try {
    password += salt;
    //re_hash the hashed password 10000 times
    for (let i = 0; i < Num_rehash; i++) {
      password = crypto.createHash("sha512").update(password).digest("hex");
    }
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
  }
};
