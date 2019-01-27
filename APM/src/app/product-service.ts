import { Injectable } from '@angular/core';
import { Product } from './products/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private productUrl = 'api/products/products.json';

constructor(
  private http: HttpClient
) { }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.productUrl).pipe(
      // tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
      console.log(errorMessage);
      return throwError(errorMessage);
    }
  }
}
