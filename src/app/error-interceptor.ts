import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse
  } from "@angular/common/http";
  import { catchError } from "rxjs/operators";
  import { throwError } from "rxjs";
  import { Injectable } from "@angular/core";
  import { MatDialog, MatSnackBar } from "@angular/material";
  
  //import { ErrorComponent } from "./error/error.component";
  //import { ErrorService } from "./error/error.service";
  
  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
  
    constructor(private dialog: MatDialog, private snackBar: MatSnackBar
      //  , private errorService: ErrorService
        ) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = "Dogodila se greška!";
          if (error.error.message) {
            errorMessage = error.error.message;
          }
         // this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
          // this.errorService.throwError(errorMessage);
         
        this.snackBar.open( errorMessage, "" ,{
          duration: 3000
        });
          
          return throwError(error);
        })
      );
    }
  }
  