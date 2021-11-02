import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
export class projectAttribute {
  nameTH!: String;
  nameEng!: String;
  graduation_year!: String;
  sorec_code!: String;
  advisor_name!: String;
  project_type!: String;
  course!: String;
  developNames!: Array<any>;
  abstract!: String;
}
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  //node/express api
  Rest_API: string = 'http://localhost:4000/api';
  // set Http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  upload(file: any): Observable<any> {
    let API_URL = `${this.Rest_API}/upload`; //"https://file.io"
    return this.httpClient.post(API_URL, file)
      .pipe(
        catchError(this.handleError)
      )
  }

  update(file: any,_id:string): Observable<any> {
    let API_URL = `${this.Rest_API}/update/${_id}`; //"https://file.io"
    return this.httpClient.put(API_URL, file)
      .pipe(
        catchError(this.handleError)
      )
  }

  approve(data:any){
    let API_URL = `${this.Rest_API}/approve`;
    return this.httpClient.put(API_URL,data,{headers: this.httpHeaders})
      .pipe(
      catchError(this.handleError)
      )
  }


  getProject() {
    let API_URL = `${this.Rest_API}/project/`;
    return this.httpClient.get(`${API_URL}`)
  }

  getUrlFile(_id:String) :Observable<any>  {
    let API_URL = `${this.Rest_API}/fileProject/${_id}`;
    return this.httpClient.get(`${API_URL}`)
  }

  getDetail(_id:String):Observable<any>  {
    let API_URL = `${this.Rest_API}/project/${_id}`;
    return this.httpClient.get(`${API_URL}`)
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
