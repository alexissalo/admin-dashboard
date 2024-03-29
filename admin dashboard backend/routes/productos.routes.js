import { Router } from "express";
import { getProducts,postProduct,editProduct,deleteProduct,getOneProduct } from "../controllers/products.controllers.js";
const router = Router();

router.get("/productos", getProducts);

router.get("/productos/:id", getOneProduct);

router.post("/productos", postProduct);

router.put("/productos/:id", editProduct);

router.delete("/productos/:id", deleteProduct);

export default router;