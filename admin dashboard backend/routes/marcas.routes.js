import { Router } from "express";
import { getMarcas, postMarca, editMarcas, deleteMarcas } from "../controllers/marcas.controllers.js"
const router = Router();

router.get("/marcas", getMarcas);

router.post("/marcas", postMarca);

router.put("/marcas/:id", editMarcas);

router.delete("/marcas/:id", deleteMarcas);

export default router;