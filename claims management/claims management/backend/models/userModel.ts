import db from  "../config/db";
import  Sequelize from "sequelize";

const users=db.define('user',{
    firstName:{
        type:Sequelize.STRING,
        allowNull :false
    },
    lastName:{
        type:Sequelize.STRING,
        allowNull:true
    },
    email:{
        type:Sequelize.STRING
        
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    role:{
        type:Sequelize.STRING,
        allowNull:true
    } 
},{
    timestamps:false
})

export default users;
