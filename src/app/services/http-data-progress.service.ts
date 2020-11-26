import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Progress} from '../models/progress';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataProgressService {
  // Progress Endpoint
  basePath = 'http://localhost:8080/api/advices/1/progress/';
  constructor(private http: HttpClient) { }
  // Http Default Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  // API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  // Create Progress
  createItem(item): Observable<Progress> {
    return this.http.post<Progress>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Progress by Id
  getItem(id): Observable<Progress> {
    return this.http.get<Progress>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Progress Data
  getList(): Observable<Progress>{
    return this.http.get<Progress>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Progress
  updateItem(id, item): Observable<Progress>{
    return this.http.put<Progress>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Progress
  deleteItem(id): Observable<any> {
    return this.http.delete<Progress>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
