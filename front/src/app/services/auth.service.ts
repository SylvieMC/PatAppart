import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  private getToken(): string {
    return JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')).token : null;
  }

  isAuthenticated() {
    const token = this.getToken();
    // Check whether the token is expired and return
    // true or fa lse
    return !this.jwtHelper.isTokenExpired(token);
}

}
