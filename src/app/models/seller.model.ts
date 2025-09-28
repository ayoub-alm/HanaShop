import {UserModel} from "./user.model";

export class SellerModel {
  id: number;
  sellerName: string;
  lat: string;
  lang: string;
  user: UserModel | null;

  constructor(id: number, sellerName: string, lat: string, lang: string, user?: UserModel) {
    this.id = id;
    this.sellerName = sellerName;
    this.lat = lat;
    this.lang = lang;
    this.user = user != null? user : null;
  }
}

// If Product and User are defined as separate DTOs, import and use them here.
