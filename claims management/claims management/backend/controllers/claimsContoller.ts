import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import claims from "../models/claimsModel";
import patient from "../models/patientModel";
import { forgetPasswordService } from "./passwordcontroler";
dotenv.config();
const handler = (req: any, res: any) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.json({ error: "Unauthorized access.", status: false });
  }
  try {
    const decodedtoken: any = jwt.verify(token, process.env.SECRETE as string);
    return decodedtoken.id;
  } catch (err) {
    return res.json({ error: "Unauthorized access.", status: false });
  }
};
const createClaim = async (req: any, res: any) => {
  try {
    const {
      claimDate,
      claimAmount,
      memberId,
      insuranceAmount,
      insurancePlan,
      maxClaimAmount,
      firstName,
    } = req.body;
    const user = await claims.create({
      claimDate,
      claimAmount,
      memberId: memberId,
      name: firstName,
      insurancePlan: insurancePlan,
      insuranceamount: insuranceAmount,
      maxclaimAmount: maxClaimAmount,
      status: "Pending",
    });
    return res.json({
      message: "Claim created successfully",
      user,
      status: true,
    });
  } catch (err: any) {
    console.log("err");
    return res.json({ message: err, status: false });
  }
};
const updateClaim = async (req: any, res: any) => {
  try {
    const { status, id, date } = req.body;
    const claimId = req.params.id;
    const updatedClaim = await claims.update(
      {
        status: status,
      },
      {
        where: {
          id: claimId,
        },
      }
    );
    const user = await patient.findOne({ where: { id: id } });
    if (user) {
      await forgetPasswordService(user.getDataValue("email"), status, id, date);
    }
    return res.json({
      message: "Claim updated successfully",
      claim: updatedClaim,
      status: true,
    });
  } catch (err: any) {
    return res.json({ message: "Error updating claim", status: false });
  }
};
const userClaims = async (req: any, res: any) => {
  try {
    const userId = req.params.id;
    const allClaims = await claims.findAll({ where: { memberId: userId } });
    if (!allClaims) {
      return res.json({ message: "No claims found", status: false });
    }
    return res.json({ claims: allClaims, status: true });
  } catch (err: any) {
    return res.json({ message: "Error fetching claims", status: false });
  }
};
const Claims = async (req: any, res: any) => {
  try {
    const claimId = req.params.id;
    const allClaims = await claims.findOne({
      where: { id: claimId, status: "Pending" },
    });
    if (!allClaims) {
      return res.json({ message: "No claims found", status: false });
    }
    return res.json({ claims: allClaims, status: true });
  } catch (err: any) {
    return res.json({ message: "Error fetching claims", status: false });
  }
};
const getAllClaims = async (req: any, res: any) => {
  try {
    const allClaims = await claims.findAll();
    if (!allClaims) {
      return res.json({ message: "No claims found", status: false });
    }
    return res.json({ claims: allClaims, status: true });
  } catch (err: any) {
    return res.json({ message: "Error fetching claims", status: false });
  }
};
const getClaims = async (req: any, res: any) => {
  try {
    const allClaims = await claims.findAll({ where: { status: "Pending" } });
    if (!allClaims) {
      return res.json({ message: "No claims found", status: false });
    }
    return res.json({ claims: allClaims, status: true });
  } catch (err: any) {
    return res.json({ message: "Error fetching claims", status: false });
  }
};
const count = async (req: any, res: any) => {
  try {
    const totalClaims = await claims.count();
    const totalmembers = await patient.count();
    const proceesingclaims = await claims.count({
      where: { status: "Pending" },
    });
    const approvedclaims = await claims.count({
      where: { status: "approved" },
    });
    const rejectedclaims = await claims.count({
      where: { status: "rejected" },
    });
    console.log(totalClaims);
    return res.json({
      total: totalClaims,
      pending: proceesingclaims,
      member: totalmembers,
      approved: approvedclaims,
      reject: rejectedclaims,
      status: true,
    });
  } catch (err: any) {
    console.log("err");
    return res.json({
      message: "Error fetching claim statistics",
      status: false,
    });
  }
};
export {
  createClaim,
  userClaims,
  Claims,
  getAllClaims,
  count,
  updateClaim,
  getClaims,
};
