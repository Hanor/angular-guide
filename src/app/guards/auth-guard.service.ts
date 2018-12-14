import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SystemService } from '../system/system.service';
 
@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
 
    constructor(
        private router: Router,
        private systemService: SystemService
    ) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.systemService.getSessionVariable('currentUser')) {
            return true;
        }
        
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}