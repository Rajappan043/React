import User from '../models/userModel';
import patient from '../models/patientModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import users from '../models/userModel';
dotenv.config();
const loginController = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        const user = await users.findOne({ where: { email: email } });
        if (!user) {
            return res.json({ message: "User not found", status: false });
        }
        const match = await bcrypt.compare(password, user.getDataValue('password'));
        if (!match) {
            return res.json({ message: "incorrect password", status: false });
        }
        const accessToken = jwt.sign({ id: user.getDataValue("id"), role: user.getDataValue("role") }, '12341234', { expiresIn: "1h" });
        let id: any;
        if (user.getDataValue('role') === 'patient') {
            const userid = await patient.findOne({ where: { email: email } });
            if (userid) {
                id = userid.getDataValue('id');
            }
        }
        res
            .cookie('accessToken', accessToken, { domain: 'localhost', maxAge: 1000 * 60 * 5, httpOnly: true, secure: true, path: '/' })
            .json({ message: "Login Successful", accessToken: accessToken, id:id, status: true, role: user.getDataValue("role") });
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: error.message, status: false });
    }
}
const logoutController = async (req: any, res: any) => {
    res.clearCookie('accessToken', { domain: 'localhost', path: '/' });
    res.json({ message: "Logout successful", status: true });
}
const createUserControllers = async (req: any, res: any) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email: email } });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                firstName: name,
                email,
                password: hashedPassword,
                role: role
            });
            if (role === 'patient') {
                await patient.create({
                    firstName: name,
                    email,
                    password: hashedPassword,
                    role: role

                })
            }
            return res.json({ message: "User created successfully", status: true, user: newUser })
        } else {
            return res.json({ message: "User already exists", status: false })
        }
    } catch (error: any) {
        res.json({ message: error.message, status: false });
    }
}
export { loginController, logoutController, createUserControllers };
