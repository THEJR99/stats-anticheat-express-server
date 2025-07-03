import { Router } from 'express';
import { uploadMethods } from '../controllers/upload.controller'

const router = Router();

router.all("/upload", uploadMethods);

export default router;