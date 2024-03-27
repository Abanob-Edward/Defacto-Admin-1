import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ICategory } from '../Models/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // private apiUrl = 'http://localhost:3000/api/categories'; // Adjust the base URL as needed

  constructor(private http: HttpClient) { }


  addCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${environment.apiUrl}/categories`, category);
  }


  getAllCategoriesWithPagination(pageNumber: number, pageSize: number): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.apiUrl}/categories`, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString()
      }
    });
  }


  getCategoryById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${environment.apiUrl}/categories/${id}`);
  }


  updateCategory(id: number, category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${environment.apiUrl}/categories/${id}`, category);
  }


  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`);
  }


  deleteAll(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/categories`);
  }


  getCategoriesByGenderWithPagination(gender: string, pageNumber: number, pageSize: number): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.apiUrl}/categories`, {
      params: {
        gender: gender,
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString()
      }
    });
  }
}

