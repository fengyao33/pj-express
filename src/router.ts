
import { Router } from 'express'
import moviesShelf from '@modules/moviesshelf/moviesshelf.routes';
import AdminUserRouter from './modules/adminauth/adminauth.routes';
import UserRouter from './modules/userauth/userauth.routes';
import adminMember from '@modules/adminmember/adminmember.routes';
const router = Router()

//importing all routes here
router.get('/', (req, res) => {
    return res.json({ Server: 'on' });
});
router.use('/api/admin/moviesShelf', moviesShelf)
router.use('/user', UserRouter);
router.use('/admin/user', AdminUserRouter);
router.use("/admin/member", adminMember);


export default router
