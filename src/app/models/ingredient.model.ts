import {ProductModel} from "./product.model";

export class IngredientModel{
    public id: number;
    public name:string;
    public description:string;
    constructor(data: { id: number; name: string; description: string; }) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }
}