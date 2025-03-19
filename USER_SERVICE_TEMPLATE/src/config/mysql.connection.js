const {Sequelize} = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DATA_BASE_NAME,
    process.env.USER,
    process.env.DATA_BASE_PASSWORD,
    {
        host: process.env.HOST,
        dialect:"mysql",
        logging:false,
    }
);

const connection = async () =>{
    try{
        await sequelize.authenticate();
        console.log("succesfully connected by sql");
    }catch(error){
        console.error("error not connected by mysql",error);
    }
}

module.exports = {
    connection,
    sequelize
}