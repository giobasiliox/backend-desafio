import { Router} from "express";
import clothesRoutes from "./clothing.routes.js";


const rotas= Router();

rotas.use("/clothing", clothesRoutes);


rotas.get("/", (req, res)=>{
    return res.status(200).send(
        {message: "Servidor ok!"}
    );
});

export default rotas;