import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  //node/express api
  Rest_API: string = 'http://localhost:4000/api';
  // set Http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  upload(file:any): Observable<any> {
    let API_URL = `${this.Rest_API}/upload`; //"https://file.io"
    return this.httpClient.post(API_URL, file)
      .pipe(
        catchError(this.handleError)
      )
  }


  getProject(){
  let API_URL = `${this.Rest_API}/project`;
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
