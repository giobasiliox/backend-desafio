export class ClothesList{
    constructor(){
        this.clothes = [];
    }

    getAllClothes(){
        return this.clothes;
    }

    getClothing(id){
        return this.clothes.find((clothing) => clothing.id == id)
    }

    addClothing(clothes){
        this.clothes.push(clothes);
    }

    updateClothing(id,nome, tipo, tamanho, cor, img, quantidade){
        this.clothes = this.clothes.map((clothing) =>{
            if(clothing.id == id){
                clothing.nome = nome;
                clothing.tipo = tipo;
                clothing.tamanho = tamanho;
                clothing.cor = cor;
                clothing.img = img;
                clothing.quantidade = quantidade;
            }
            return clothing
        })
                return this.getClothing(id);
    }

    removeClothing(id){
        this.clothes = this.clothes.filter((clothing) => clothing.id !== id);
    }
}