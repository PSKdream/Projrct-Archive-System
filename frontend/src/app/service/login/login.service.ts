import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

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
  delete!: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //node/express api
  Rest_API: string = 'http://localhost:4000/api';
  // set Http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  // dataAccount:Account[] = [];

  constructor(private httpClient: HttpClient,private cookieService: CookieService) { }

  deleteDataUser(){
    this.cookieService.delete('userAccount');
  }
  getDataUser(){
    try {
      return this.cookieService.get('userAccount')!==''?JSON.parse(this.cookieService.get('userAccount')):undefined
    } catch (error) {
      console.log(error);
      return undefined
    }
  }

  login(data: loginAccount): Observable<any> {
    let API_URL = `${this.Rest_API}/validate-login`;
    return this.httpClient.post(API_URL,data, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        // this.dataAccount=res
        // console.log(res);
        this.cookieService.set('userAccount',JSON.stringify(res));
        return this.getDataUser() || {}
      }),
      catchError(this.handleError)
      )
  }

  getUserList() {
    let API_URL = `${this.Rest_API}/get-user`;
    return this.httpClient.get(`${API_URL}`)
  }

  getTeacherList(): Observable<any>  {
    let API_URL = `${this.Rest_API}/get-teacher`;
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

  updatePassword(data:any){
    let API_URL = `${this.Rest_API}/update-password`;
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
