import { ClothesList } from "../models/clothes/ClothesList.js";
import { Clothing } from "../models/clothes/clothing.js";

const list = new ClothesList();

export const getClothing = (req, res) => {
    const clothing = list.getAllClothes();
    if(clothing.length){
        return res.status(200).send(clothing)
    }
    return res.status(200).send({message: "Não há roupas cadastrados"});
};

export const getClothesById = (req, res)=>{
    const {id} = req.params;

    const clothing = list.getClothing(id);
    if(!clothing){
        return res.status(404).send({error:"Roupa não encontrada!"})
    }
    
    return res.status(200).send(clothing);
};

export const createClothing = (req, res) =>{
    const {nome, tipo, tamanho, cor, img, quantidade} = req.body;

    if (!nome || !tipo || !tamanho || !cor || !img || !quantidade){
        return res.status(400).send({
            message: "Parâmetros inválidos"
        });
    }
    const clothing = new Clothing (nome, tipo, tamanho, cor, img, quantidade)

    list.addClothing(clothing);

    return res.status(201).send({
        message: "Roupa criada com sucesso",
        clothing,
    });
};

export const updateClothing = (req, res) => {
        const {id} = req.params;
        const {nome, tipo, tamanho, cor, img, quantidade} = req.body;

        if (!nome || !tipo || !tamanho || !cor || !img || !quantidade){
            return res.status(400).send({
                message: "Parâmetros inválidos"
            });
        }

        const clothing = list.getClothing(id)

        if(!clothing){
            return res.status(404).send({
                error: "Roupa não encontrada"
            });
        }

        const updateClothing = list.updateClothing(id, nome, tipo, tamanho, cor, img, quantidade);

        return res.status(200).send({
            message: `Roupa atualizada com sucesso`,
            updateClothing,
            });

};

export const deleteClothing = (req, res) => {
    const {id} = req.params;
    const clothing = list.getClothing(id);
    if(!clothing){
        return res.status(404).send({
            message:"Roupa não encontrada",
        });
    }
    list.removeClothing(id);
    return res.status(200).send({
        message: "Roupa deletada com sucesso!",
})
}