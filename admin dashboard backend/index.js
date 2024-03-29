import express from "express"
import cors from "cors"
import db from "./db.js";
import productRoutes from "./routes/productos.routes.js";
import categoriesRoutes from "./routes/categorias.routes.js"
import marcasRoutes from "./routes/marcas.routes.js"
import usuarioRoutes from "./routes/usuarios.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use(productRoutes);
app.use(categoriesRoutes)
app.use(marcasRoutes)
app.use(usuarioRoutes)

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`SERVER FUNCIONANDO EN EL PUERTO ${PORT}`);
});
