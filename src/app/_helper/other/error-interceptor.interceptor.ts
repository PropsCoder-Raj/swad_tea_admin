import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { UserService } from '../user/user.service';


@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
        if (err.status === 401 || err.status === 403) {
            // auto logout if 401 response returned from api
            let currentUser = this.authenticationService.currentUserValue;
            if (currentUser && currentUser.rememberMe) {
              this.authenticationService.refreshToken(currentUser.refreshToken).subscribe(user=>{
                console.log(user);
              });
            }else {
              this.authenticationService.logout();
              location.reload();
            }
            
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
    }))
  }
}
