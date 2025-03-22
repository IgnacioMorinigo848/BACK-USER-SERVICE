const User = require("../model/user.model");
const {hashPassword} = require("../util/hash"); 

const verifyDataRegister = async (email, nickName) => {
  try {
    const [emailResponse, nickNameResponse] = await Promise.all([
      User.findOne({ where: { email } }),
      User.findOne({ where: { nickName } })
    ]);

    let errors = {};

    if (emailResponse) errors.email = "Email already exists.";
    if (nickNameResponse) errors.nickName = "Nickname already exists.";

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    return { success: true };
  } catch (error) {
    return { success: false, errors: { server: "Database error" } };
  }
};

const previousRegisterDataService = async (email, nickName) => {
  try {
    const password = await hashPassword(Math.floor(100000000000 + Math.random() * 900000000000).toString());
    await User.create({ email, nickName,password});
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = {
  verifyDataRegister,
  previousRegisterDataService
};
