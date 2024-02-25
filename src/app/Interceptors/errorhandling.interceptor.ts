import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ErrorhandlingInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error:HttpErrorResponse)=>{
      let msg=''
      if(error.status==404){
        this.router.navigate(['/error404'])
      }
      else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "something went wrong!",
        showConfirmButton: false,
        timer: 3000
      });
    }    
    return throwError(msg)
  })
  );
  }
}
