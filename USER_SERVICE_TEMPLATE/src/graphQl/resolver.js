const userService = require("../service/user.service");
const emailOptions = require("../util/transportadorSMTP");
const jwt = require("../auth/jwt");

const resolvers = {
  Mutation: {
    previousRegisterData: async (_, { email, nickName }) => {
      try {
        const response = await userService.verifyDataRegister(email, nickName);
        console.log(response)
        if (!response.success) {
          return { error: JSON.stringify(response.errors) };
        }

        const saveResponse = await userService.previousRegisterDataService(email, nickName);
        console.log(saveResponse)
        if (!saveResponse.success) {
          return { error: "error registed user." };
        }
        
        const code = emailOptions.generateNumber()

        const emailResponse = await emailOptions.sendEmail(email, code);
        console.log(code)
        console.log(emailResponse)
        if (!code) {
          return { error: "Error sent email." };
        }

        const token = jwt.tokenTemporal( email, code );
        console.log(token)
        return  {token} ;
      } catch (error) {
        return { error: "Error internal server." };
      }
    },
    completeRegisterData: async (_,{password},context)=>{
      const {user} = context;
      console.log(user.code, user.email);
      token = "hola"
      return {token}
    }
  }
};

module.exports = resolvers;
