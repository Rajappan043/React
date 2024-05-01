import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import patient from "../models/patientModel";
import bcrypt from 'bcrypt';
import users from '../models/userModel';
dotenv.config();
const handler = (req: any, res: any) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.json({ error: 'Unauthorized access.', status: false })
    }
    try {
        const decodedtoken: any = jwt.verify(token, process.env.SECRETE as string);
        return decodedtoken.id;

    } catch (err) {
        return res.json({ error: 'Unauthorized access.', status: false })
    }

}
const updateUser = async (req: any, res: any) => {
    try {
        const userId = req.params.id;
        const { DOB, address, phoneNo, lastName, insurancePlan ,insuranceamount,maxClaimableAmount} = req.body;
        const user=await patient.update({
            DOB,
            lastName,
            address,
            phoneNo,
            insurancePlan,
            insuranceamount,
            maxClaimableAmount
        }, { where: { id: userId } });
       return res.json({ message: "User updated successfully",user, status: true });
    } catch (err: any) {
        return res.json({error:err.meesage,status:false});
    }
}

const getUserDetails = async (req: any, res: any) => {
    try {
        const userId =req.params.id;
        const user = await patient.findOne({ where: { id: userId } });
        if (!user) {
            return res.json({ message: "User not found", status: false });
        }
        return res.json({ user, status: true });
        } catch (err: any) {
            return res.json({ message: "Error fetching user details", status: false });
    }
}


const alluserController=async(req:any,res:any)=>{
    try{
        const allusers=await patient.findAll({attributes:['id','firstName','email','phoneNo','insurancePlan','insuranceamount']});
        if(!allusers){
            return res.json({message:"No users found",status:false});
        }
        console.log(allusers)
        return res.json({users:allusers,status:true});
        }catch(err:any){
            return res.json({message:"Error fetching all users",status:false});
        }
    }
const createuserController=async(req:any,res:any)=>{
    try{
        const {name,email,password,DOB,address,gender,insuranceplan,insuranceamount,phoneNo}=req.body;
        const existingUser=await patient.findOne({where:{email:email}});
        if(!existingUser){
            const hashedPassword=await bcrypt.hash(password,10);
            const newUser=await patient.create({
                firstName:name,
                email,
                password:hashedPassword,
                DOB:DOB,
                address:address,
                gender:gender,
                insurancePlan:insuranceplan,
                insuranceamount:insuranceamount,
                maxClaimableAmount:30000,
                phoneNo:phoneNo,
                role:"patient"
            })
            await users.create({firstName:name,email,password:hashedPassword,role:'patient'})
                return res.json({message:"User created successfully",status:true});
        }
        else{
            return res.json({message:"User already exists",status:false});
        }
    }
    catch(err:any){
            return res.json({message:err.message,status:false});
    }
}
export {getUserDetails,alluserController,updateUser,createuserController};
