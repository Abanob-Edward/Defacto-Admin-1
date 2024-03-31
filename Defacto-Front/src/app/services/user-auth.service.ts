import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILogin } from '../Models/ilogin';

@Injectable({
 providedIn: 'root'
})
export class UserAuthService {
 constructor(private http: HttpClient) { }

 login(loginData: ILogin): Observable<ILogin> {
    return this.http.post<ILogin>('http://localhost:5025/api/Account/login', loginData).pipe(
      tap(response => {

        localStorage.setItem('stringtoken', response.stringtoken);
      })
    );
 }

 logout() {
    localStorage.removeItem("stringtoken");
 }

 isLoggedIn(): boolean {
    return localStorage.getItem("stringtoken") ? true : false;
 }
}
