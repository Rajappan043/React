import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import sequelize from './config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { router } from './routes/indexRoutes';
import patient from './models/patientModel';
import bodyparser from 'body-parser'
const app=express();

app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000'],
  allowedHeaders: [
    'Origin', 'X-Requested-With',
    'Content-Type', 'Accept',
    'Authorization',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json());
app.use(bodyparser.json())
app.get('/',(req:any,res:any)=>{
    res.send('message')
})
app.use('/',router);
app.post("/login", async (req:any, res:any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    // Find user by email
    const user = await patient.findOne({ where: { email:email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.getDataValue('password'));
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.getDataValue('id') }, 'secretKey', { expiresIn: "1h" });

    // Return token to client
    res.json({ accessToken: token });
  } catch (error:any) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error",error:error.message });
  }
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    const PORT = 3001;
    app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
  })
  .catch(error => console.error('Error syncing database:', error));
