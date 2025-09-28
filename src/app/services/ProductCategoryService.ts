import {Injectable} from "@angular/core";
import {map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductCategory as ProductCategoryModel} from "../models/ProductCategory";
import {ProductModel} from "../models/product.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:'root'
})
export class ProductCategoryService {
  ProductCategories: ProductCategoryModel[];
  private readonly baseUrl=  environment.apiBaseUrl;
  constructor(private http: HttpClient) {
    this.ProductCategories = [];
  }

  /**
   * this function allows to get all categories of products
   */
  public getProductsCategories(): Observable<ProductCategoryModel[]> {
    return this.http.get<ProductCategoryModel[]>(`${this.baseUrl}/categories`).pipe(
      map(products => products.map(product => new ProductCategoryModel(
        product.id,
        product.name,
        product.icon,
        product.ref,
        product.description
      )))
    );
  }
}
