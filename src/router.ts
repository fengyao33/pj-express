
import { Router } from 'express'
import moviesShelf from '@modules/moviesshelf/moviesshelf.routes';
const router = Router()

router.use('/api/admin/moviesShelf', moviesShelf)

export default router
