import db from "../config/db";
import Sequelize from "sequelize";
import patient from "./patientModel";
const invoice=db.define('invoice',{
   InvoiceNo:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true    
    },
    InvoiceDate:{
        type:Sequelize.DATEONLY,
        allowNull:false
    },
    DueDate:{
        type:Sequelize.DATEONLY,
        allowNull:false
    },
    patientId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    patientName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    paientAddr:{
        type:Sequelize.STRING,
        allowNull:false
    },
    consultantFee:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    DiagnosticTestFee:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    diagnosticScanFee:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    BillAmount:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    tax:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    totalAmount:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    status:{
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue:'pending'
    }
},{
    timestamps:true
})

export default invoice;