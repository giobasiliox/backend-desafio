import { ClothesList } from "../models/clothes/ClothesList.js";
import { Clothing } from "../models/clothes/clothing.js";

const list = new ClothesList();

export const getClothing = (req, res) => {

    let roupas = list.getAllClothes();

    const { tamanho, tipo, cor } = req.query

    if (tamanho && tipo) {
        roupas = list.getRoupaPeloTamanhoTipo(tamanho, tipo);
    } else if (tamanho) {
        roupas = list.getRoupaPorTamanho(tamanho);
    } else if (tipo) {
        roupas = list.getRoupaPorTipo(tipo);
    } else if (cor) {
        roupas = list.getRoupaPelaCor(cor);
    } else {
        roupas = list.getAllClothes();
    }


    if (roupas.length) {
        return res.status(200).send({message: `${roupas.length} roupas estão cadastradas`,roupas});
    }
    return res.status(404).send({ message: "Não há roupas cadastrados" });
};

export const getClothesById = (req, res) => {
    const { id } = req.params;

    const clothing = list.getClothing(id);
    if (!clothing) {
        return res.status(404).send({ error: "Roupa não encontrada!" })
    }

    return res.status(200).send(clothing);
};

export const createClothing = (req, res) => {
    let { nome, tipo, tamanho, cor, img, quantidade } = req.body;
    tamanho = tamanho.toUpperCase();

    const erros = [];

    if (!nome || !tipo || !tamanho || !cor || !img || !quantidade) {
        return res.status(400).send({
            message: "Parâmetros inválidos"
        });
    }

    if (nome.length < 6) {
        erros.push({ error: " mínimo 6 caracteres" })
    }

    if (nome.length > 40) {
        erros.push({ error: " máximo 40 caracteres." });
    }
    if (tipo.length > 50) {
        erros.push({ error: "A cor do item deve ser uma string com no máximo 50 caracteres." });
    }
    if (tamanho != "PP" && tamanho != "P" && tamanho != "M" && tamanho != "G" && tamanho != "GG" && tamanho != "XG") {
        erros.push({ error: "O tamanho do item deve ser apenas as strings PP, P, M, G, GG e XG." });
    }
    if (cor.length > 20) {
        erros.push({ error: "A cor do item deve ser uma string com no máximo 20 caracteres." });
    }
    if (quantidade < 1 || quantidade > 15000 || !Number.isInteger(quantidade)) {
        erros.push({ error: "A quantidade em estoque deve ser um número inteiro positivo limitado a 15000.        " });
    }
    if (!img.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i)) {
        erros.push({ error: "Image must be a valid URL with .jpg, .png or .jpeg" });
    }
    if (erros.length) {
        return res.status(400).send({ errors: erros });
    } else {
        const clothing = new Clothing(nome, tipo, tamanho, cor, img, quantidade)

        list.addClothing(clothing);

        return res.status(201).send({
            message: "Roupa criada com sucesso",
            clothing,
        });
    }
};

export const updateClothing = (req, res) => {
    const { id } = req.params;
    const { nome, tipo, tamanho, cor, img, quantidade } = req.body;

    const erros = [];

    if (!nome || !tipo || !tamanho || !cor || !img || !quantidade) {
        return res.status(400).send({
            message: "Parâmetros inválidos"
        });
    }

    if (nome.length < 6) {
        erros.push({ error: " mínimo 6 caracteres" })
    }

    if (nome.length > 40) {
        erros.push({ error: " máximo 40 caracteres." });
    }
    if (tipo.length > 50) {
        erros.push({ error: "A cor do item deve ser uma string com no máximo 50 caracteres." });
    }
    if (tamanho != "PP" && tamanho != "P" && tamanho != "M" && tamanho != "G" && tamanho != "GG" && tamanho != "XG") {
        erros.push({ error: "O tamanho do item deve ser apenas as strings PP, P, M, G, GG e XG." });
    }
    if (cor.length > 20) {
        erros.push({ error: "A cor do item deve ser uma string com no máximo 20 caracteres." });
    }
    if (quantidade < 1 || quantidade > 15000 || !Number.isInteger(quantidade)) {
        erros.push({ error: "A quantidade em estoque deve ser um número inteiro positivo limitado a 15000.  " });
    }
    if (!img.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i)) {
        erros.push({ message: "Image must be a valid URL with .jpg, .png or .jpeg" });
    }
    if (erros.length) {
        return res.status(400).send({ errors: erros });
    }else{

    const clothing = list.getClothing(id)

    if (!clothing) {
        return res.status(404).send({
            error: "Roupa não encontrada"
        });
    }

    const updateClothing = list.updateClothing(id, nome, tipo, tamanho, cor, img, quantidade);

    return res.status(200).send({
        message: `Roupa atualizada com sucesso`,
        updateClothing,
    });

}};

export const deleteClothing = (req, res) => {
    const { id } = req.params;
    const clothing = list.getClothing(id);
    if (!clothing) {
        return res.status(404).send({
            message: "Roupa não encontrada",
        });
    }
    list.removeClothing(id);
    return res.status(200).send({
        message: "Roupa deletada com sucesso!",
    })
}