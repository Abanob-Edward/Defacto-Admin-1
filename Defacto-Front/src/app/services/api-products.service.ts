import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  constructor(private http: HttpClient) { }


  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${environment.apiUrl}/products`, product);  // JSON.stringify(product)
  }


  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.apiUrl}/products`);
  }


  getProductByID(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.apiUrl}/products/${id}`);
  }


  getProductsByCategoryID(catID: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.apiUrl}/products?catID=${catID}`);  // { params: { CategoryID: catID.toString() } }
  }


  updateProduct(id: number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${environment.apiUrl}/products/${id}`, product);
  }


  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }

  // deleteProduct(id: number, body: any): Observable<any> {
  //   return this.http.request('DELETE', `${environment.apiUrl}/products/${id}`, { body });
  //  }

}
