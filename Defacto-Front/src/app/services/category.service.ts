import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ICategory } from '../Models/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}/api/Category`);
  }


  createCategory(formData: FormData): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.apiUrl}/api/Category`, formData);
  }


  updateCategory(formData: FormData): Observable<ICategory> {
    const id = formData.get('id');
    return this.http.put<ICategory>(`${this.apiUrl}/api/Category`, formData);
   }   

  getCategoriesByGender(gender: 'Male' | 'Female' | null, page: number, pageSize: number): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}/categories/gender/${gender}?page=${page}&pageSize=${pageSize}`);
  }

  getCategoryByID(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/categories/${id}`);
  }

  getAllCategories(page: number, pageSize: number): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}/categories?page=${page}&pageSize=${pageSize}`);
  }

  hardDelete(id: number,name:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/Category/HardDelete?ID=${id}&Name=${name}`);
  }

  softDelete(id: number): Observable<any> {
    const body = { isDeleted: true };
    return this.http.patch(`${this.apiUrl}/categories/${id}/soft-delete`, body);
  }

}

