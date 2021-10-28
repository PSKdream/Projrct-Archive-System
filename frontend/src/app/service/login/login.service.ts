import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class addAccount {
  username!: String;
  password!: String;
  firstname!: String;
  lastname!: String;
  role!: String;
}
export class loginAccount {
  username!: String;
  password!: String;
}
export class Account {
  username!: String;
  _id!: String;
  firstname!: String;
  lastname!: String;
  role!: String;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //node/express api
  Rest_API: string = 'http://localhost:4000/api';
  // set Http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  dataAccount:Account[] = [];

  constructor(private httpClient: HttpClient) { }

  getDataUser(){
    return this.dataAccount
  }

  login(data: loginAccount): Observable<any> {
    let API_URL = `${this.Rest_API}/validate-login`;
    return this.httpClient.post(API_URL,data, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        this.dataAccount.push(res)
        return this.getDataUser() || {}
      }),
      catchError(this.handleError)
      )
  }

  getUserList() {
    let API_URL = `${this.Rest_API}/get-user`;
    return this.httpClient.get(`${API_URL}`)
  }

  addUser(data: addAccount): Observable<any> {
    let API_URL = `${this.Rest_API}/insert-user`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteUser(id: any): Observable<any>{
    let API_URL = `${this.Rest_API}/delete-user/${id}`;
    return this.httpClient.delete(API_URL,{headers: this.httpHeaders})
      .pipe(
        catchError(this.handleError)
      )
  }

  updateUser(data:any){
    let API_URL = `${this.Rest_API}/update-user`;
    return this.httpClient.put(API_URL,data,{headers: this.httpHeaders})
      .pipe(
      catchError(this.handleError)
      )
  }
  

  


  //Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //handle client Error
      errorMessage = error.error.message
    } else {
      //Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(error);
  }
}
