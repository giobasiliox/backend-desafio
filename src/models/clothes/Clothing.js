import {v4 as uuidv4} from "uuid";

export class Clothing{
    constructor(nome, tipo, tamanho, cor, img, quantidade){
        this.id = uuidv4();
        this.nome = nome;
        this.tipo = tipo;
        this.tamanho = tamanho;
        this.cor = cor;
        this.img = img;
        this.quantidade = quantidade;
    }
}