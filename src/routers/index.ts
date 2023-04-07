import express from 'express';
import indexController from '../controllers/indexController';
const router = express.Router();

router.get('/', indexController.index)

export default router;