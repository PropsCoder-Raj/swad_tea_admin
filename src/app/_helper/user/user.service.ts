import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  public _headers: any;
  
  constructor(public http: HttpClient) {
    this._headers = { 'Content-Type': 'application/json' }; 
  }

  // Get Single User
  getSingleUser(id: any) {
    return this.http.get<any>(`${environment.baseURL}/user/` + id)
      .pipe(map(data => {
        return data;
      }));
  }

  // Update User Status
  updateUserStatus(status: any, id: any) {
    const data = JSON.stringify({
      "status": status
    });
    return this.http.put<any>(`${environment.baseURL}/user-status/` + id, data, { headers: this._headers })
      .pipe(map(data => {
        return data;
      }));
  }

}
