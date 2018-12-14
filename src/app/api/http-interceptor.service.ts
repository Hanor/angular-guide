import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { SystemService } from '../system/system.service';
 
 
@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private userService: UserService,
        private router: Router,
        private systemService: SystemService
    ) {}
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 && (err.error === 'jwt expired' || err.error === 'Token not found.')) { 
                let state = this.router.routerState.snapshot;
                this.systemService.removeAllSessionVariables();
                this.userService.currentUser$.next(null);
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            } 
            return throwError(err);
        }))
    }
}