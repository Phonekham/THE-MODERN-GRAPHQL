import bcrypt from "bcryptjs";

const hashPassword = password => {
  if (password.length < 8) {
    throw new Error("Psssword must be 8 charactors or longer");
  }
  return bcrypt.hash(password, 10);
};

export { hashPassword as default };
