import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../Models/iuser';
import { IApiResponse } from '../Models/iapi-response';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apicreate = 'http://localhost:5025/api/Account/addNewUser';
  private apiUrl = 'http://localhost:5025/api/User/AllUsersPaging';
  private apiUpdated = 'http://localhost:5025/api/User/BlockOrUnBlock';

  constructor(private http: HttpClient) { }

  getAllUsers(page: number, pageSize: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.apiUrl}/${page}/${pageSize}`);
   }
   createUser(role: string, user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apicreate}/${role}`, user);
}


  blockOrUnblockUser(id: string, isBlocked: boolean): Observable<any> {
    const body = { id, isBlocked };
    return this.http.patch(this.apiUpdated, body);
 }

}


