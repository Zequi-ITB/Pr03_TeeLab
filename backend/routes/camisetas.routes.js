import { Router } from 'express';
import * as camisetasController from '../controllers/camisetas.controller.js';

const router = Router();

router.get("/", camisetasController.getAllCamisetas);
router.get("/:id",camisetasController.getCamisetaById);



export default router;
