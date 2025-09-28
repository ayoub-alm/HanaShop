import {SellerModel} from "../models/seller.model";

export class ProductCreateDto{
   name: string;
   img: File[];
   price: number ;
   description: string;
   ref: string;
   sku: string;
   categoryId: number;
   sellerId: number;

  constructor(name: string, images: File[], price: number, description: string, ref: string, sku: string,categoryId:number , sellerId: number) {
    this.name = name;
    this.img = images;
    this.price = price;
    this.description = description;
    this.ref = ref;
    this.sku = sku;
    this.categoryId = categoryId;
    this.sellerId = sellerId;
  }


}
