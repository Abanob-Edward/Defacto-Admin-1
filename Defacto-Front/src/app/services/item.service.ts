import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getByID(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.apiUrl}/items/${id}`);
  }


  getAllPagination(pageNumber: number, pageSize: number): Observable<IProduct[]> {
    let params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString());
    return this.http.get<IProduct[]>(`${environment.apiUrl}/items`, { params });
  }

  getListOfItemForProduct(productId: number, pageNumber: number, pageSize: number): Observable<IProduct[]> {
    let params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString());
    return this.http.get<IProduct[]>(`${environment.apiUrl}/items/product/${productId}`, { params });
  }

  create(item: IProduct): Observable<any> {
    return this.http.post(`${environment.apiUrl}/items`, item);
  }

  update(id: number, item: IProduct): Observable<any> {
    return this.http.put(`${environment.apiUrl}/items/${id}`, item);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/items/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/items`);
  }
}

