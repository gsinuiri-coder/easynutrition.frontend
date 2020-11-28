import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Nutricionist} from '../models/nutricionist';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataNutricionistService {
// Nutricionists Endpoint
  basePath = 'http://localhost:8080/api/nutricionists';
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

  // Create Nutricionist
  createItem(item): Observable<Nutricionist> {
    return this.http.post<Nutricionist>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Nutricionist by Id
  getItem(id): Observable<Nutricionist> {
    return this.http.get<Nutricionist>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Nutricionist Data
  getList(): Observable<Nutricionist>{
    return this.http.get<Nutricionist>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Nutricionist
  updateItem(id, item): Observable<Nutricionist>{
    return this.http.put<Nutricionist>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Nutricionist
  deleteItem(id): Observable<any> {
    return this.http.delete<Nutricionist>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
