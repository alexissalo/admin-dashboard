import { Router } from "express";
import { getCategories,postCategories,editCategories,deleteCategories } from "../controllers/categories.controllers.js"
const router = Router();

router.get("/categorias", getCategories);

router.post("/categorias", postCategories);

router.put("/categorias/:id", editCategories);

router.delete("/categorias/:id", deleteCategories);

export default router;