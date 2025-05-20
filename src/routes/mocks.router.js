import { Router } from "express";
import mocksController from "../controllers/mocks.controller.js";
const router = Router()

// endpoint para obtener mascota simulada
router.get("/mockingpets", mocksController.crearMascotas)

router.get("/mockingusers", mocksController.crearUsuarios)

router.post("/generateData", mocksController.generateData)

export default router