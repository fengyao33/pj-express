import movies from '@modules/movies/movies.routes';
import { Router } from 'express';
import AdminUserRouter from './modules/adminauth/adminauth.routes';

import adminaActivities from "@modules/adminactivities/adminactivities.routes";
import adminMember from '@modules/adminmember/adminmember.routes';
import adminMovies from "@modules/adminmovies/adminmovies.routes";
import UserRouter from '@modules/user/user.routes';
import AdminTheatersRouter from '@modules/admintheaters/admintheaters.routes';
import AdminRoomsRouter from '@modules/adminrooms/adminrooms.routes';
import AdminSeatsRouter from '@modules/adminseats/adminseats.routes';

import SessionsRouter from '@modules/sessions/admin-sessions.routes';
import Statistics from '@modules/statistics/statistics.routes';
import TheatersRouter from '@modules/theaters/theaters.routes';
import BookingRouter from '@modules/booking/booking.routes';
import Home from '@modules/home/home.routes';
import activities from '@modules/activities/activities.routes';
const router = Router();

//importing all routes here
router.get('/', (req, res) => {
  return res.json({ Server: 'on' });
});

router.use('/admin/moviesShelf', movies)
router.use('/admin/activities', adminaActivities)
router.use('/movies', movies);
router.use('/activity', activities);
router.use('/user', UserRouter);
router.use('/admin/user', AdminUserRouter);
router.use('/admin/member', adminMember);
router.use('/admin/movies', adminMovies);
router.use('/admin/statistics', Statistics);
router.use('/admin/theaters', AdminTheatersRouter);
router.use('/admin/rooms', AdminRoomsRouter);
router.use('/admin/seats', AdminSeatsRouter);
router.use('/admin/sessions', SessionsRouter);
router.use('/sessions', SessionsRouter);
router.use('/theaters', TheatersRouter);
router.use('/booking', BookingRouter);
router.use('/home', Home);

export default router;
