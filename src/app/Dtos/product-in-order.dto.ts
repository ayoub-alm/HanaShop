import { ProductModel } from "../models/product.model";

export class ProductInOrderDto{

    product: ProductModel;
    quantity: number;

    constructor(product: ProductModel, quantity:number){

        this.product = product;
        this.quantity = quantity;
    }
}