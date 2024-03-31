import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {
  // private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createProduct(formData: FormData): Observable<IProduct> {
    return this.http.post<IProduct>(`${environment.apiUrl}/api/Product/CreateProductWithImage`, formData);
 }

   
  // addProduct(product: IProduct): Observable<IProduct> {
  //   return this.http.post<IProduct>(`${environment.apiUrl}/products`, product);  // JSON.stringify(product)
  // }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.apiUrl}/GetAllProduct`);
  }


  getProductByID(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.apiUrl}/GetAllProduct/${id}`);
  }


  getProductsByCategoryID(catID: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.apiUrl}/GetAllProduct?catID=${catID}`);  // { params: { CategoryID: catID.toString() } }
  }


  updateProduct(id: number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${environment.apiUrl}/GetAllProduct/${id}`, product);
  }


  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/GetAllProduct/${id}`);
  }

  // deleteProduct(id: number, body: any): Observable<any> {
  //   return this.http.request('DELETE', `${environment.apiUrl}/products/${id}`, { body });
  //  }

}
