const { type } = require("os");
const {sequelize} = require("../config/mysql.connection");
const {DataTypes} = require("sequelize");
const { error } = require("console");

const user = sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING(250),
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING(250),
        allowNull: false,
    },
    profileImage:{
        type:DataTypes.BLOB,
        allowNull:true,
    },
    nickName:{
        type:DataTypes.STRING(25),
        allowNull:false,
        unique:true,
    },
    email:{
        type:DataTypes.STRING(50),
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING(12),
        allowNull:false,
    },
    statusRegistration:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    isStudient:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }

},{
    tableName:"user",
});

sequelize.sync({alter:true})
.then(()=>{
    console.log("tables synchronized sucessfully.");
})
.catch(error, ()=>{
    console.error("tables can't be synchronized",error)
})

module.exports = user;