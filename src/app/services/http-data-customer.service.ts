import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Customer} from '../models/customer';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataCustomerService {
// Customers Endpoint
  basePath = 'http://localhost:8080/api/customers';
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

  // Create Customer
  createItem(item): Observable<Customer> {
    return this.http.post<Customer>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Customer by Id
  getItem(id): Observable<Customer> {
    return this.http.get<Customer>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Customer Data
  getList(): Observable<Customer>{
    return this.http.get<Customer>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Customer
  updateItem(id, item): Observable<Customer>{
    return this.http.put<Customer>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Customer
  deleteItem(id): Observable<any> {
    return this.http.delete<Customer>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
