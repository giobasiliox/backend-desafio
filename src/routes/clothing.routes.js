import { Router} from "express";
import { createClothing, deleteClothing, getClothesById, getClothing, updateClothing } from "../controllers/clothes.controllers.js";

const studentsRoutes = Router();

studentsRoutes.get("/", getClothing);

studentsRoutes.get("/:id", getClothesById);

studentsRoutes.post("/", createClothing);

studentsRoutes.put("/:id", updateClothing);

studentsRoutes.delete("/:id",  deleteClothing);
export default studentsRoutes