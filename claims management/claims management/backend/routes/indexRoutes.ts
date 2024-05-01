import express from 'express';
import {getUserDetails,alluserController,updateUser,createuserController} from '../controllers/userController'
import {loginController, logoutController ,createUserControllers} from '../controllers/loginController';
import {createClaim,getAllClaims,count,updateClaim, userClaims, getClaims, Claims} from '../controllers/claimsContoller';
import { Request,Response,NextFunction } from 'express';
import  jwt from 'jsonwebtoken';
const router = express.Router();
const authenticateToken = (req: any, res: Response, next: NextFunction) => {
    const accesstoken = req.cookies.accessToken

    try {
        if (!accesstoken) {
            return res.status(403).json({ message: 'No token provided', status: false });
        }
        jwt.verify(accesstoken,'12341234', (err: any, decoded: any) => {
            if (err) return res.status(403).json({ message: 'invalid token', status: false });
            req.user = decoded;
        })
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token', status: false});
    }
};

router.get('/user/:id',getUserDetails);
router.get('/users', alluserController);
router.put('/user/:id',updateUser);
router.post('/create', createuserController);
router.post('/log/login',loginController);
router.post('/log/logout',authenticateToken,logoutController);
router.post('/register',createUserControllers);
router.post('/claim/create',createClaim);
router.get('/claim/all/',getAllClaims);
router.get('/claim/',getClaims);
router.get('/claim/:id',userClaims);
router.get('/claims/:id',Claims);
router.get('/count',count);
router.put('/claim/update/:id',updateClaim);

export {router};