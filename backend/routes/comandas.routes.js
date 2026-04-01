import { Router } from 'express';
import * as comandasController from '../controllers/comandas.controller.js';

const router = Router();

router.get("/", comandasController.getAllComandas);
router.get("/:id", comandasController.getComandaById);
router.post("/", comandasController.createComanda);

export default router;
