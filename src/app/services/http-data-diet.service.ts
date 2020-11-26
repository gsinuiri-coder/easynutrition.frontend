import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Diet} from '../models/diet';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataDietService {
// Diets Endpoint
  basePath = 'http://localhost:8080/api/nutricionists/1/diets';
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

  // Create Diet
  createItem(item): Observable<Diet> {
    return this.http.post<Diet>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Diet by Id
  getItem(id): Observable<Diet> {
    return this.http.get<Diet>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Diet Data
  getList(): Observable<Diet>{
    return this.http.get<Diet>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Diet
  updateItem(id, item): Observable<Diet>{
    return this.http.put<Diet>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Diet
  deleteItem(id): Observable<any> {
    return this.http.delete<Diet>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
