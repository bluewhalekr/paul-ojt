import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { defer, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: AuthService,
    private afAuth: AngularFireAuth,
  ) { }

  canActivate({ routeConfig }: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => {
        console.log('canActivate sss')
        console.log(routeConfig)
        console.log(user?.refreshToken)
        console.log('canActivate eee')

        if (user?.refreshToken) {
          return true
        } else {
          this.router.navigate(['login', 'sign-in']).then()
          return false
        }
      })
    );
  }
}
