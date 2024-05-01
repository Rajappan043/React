import db from '../config/db';
import  Sequelize  from 'sequelize';

const claims=db.define('claims',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    memberId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    insurancePlan:{
        type:Sequelize.STRING,
        allowNull:false
    },
    insuranceamount:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    claimDate:{
        type:Sequelize.DATEONLY,
        allowNull:false
    },
    claimAmount:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    maxclaimAmount:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    status:{
        type:Sequelize.STRING,
        defaultValue:"processing"
    }
})

export default claims;