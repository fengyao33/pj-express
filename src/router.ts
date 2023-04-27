import { Router } from 'express';
import AdminUserRouter from './modules/adminauth/adminauth.routes';
import UserRouter from './modules/userauth/userauth.routes';
const router = Router()

//importing all routes here
router.get('/', (req, res) => {
    return res.json({ Server: 'on' });
});
router.use('/user', UserRouter);
router.use('/admin/user', AdminUserRouter);


export default router
