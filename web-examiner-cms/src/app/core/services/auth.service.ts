import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRes, LoginReq } from 'src/app/shared/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlSuffix = '/auth';

  private adminAuthTokeStorageKey = 'adminAuthToken';
  private loggedIn: boolean = false;

  constructor(
    private httpClient: HttpClient
  ) {
    this.loggedIn = !!localStorage.getItem(this.adminAuthTokeStorageKey);
  }

  login$(loginBody: LoginReq): Observable<LoginRes> {
    return this.httpClient.post<LoginRes>(this.urlSuffix + '/login', loginBody);
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem(this.adminAuthTokeStorageKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.adminAuthTokeStorageKey, token);
  }

  get getToken(): string {
    return localStorage.getItem(this.adminAuthTokeStorageKey);
  }

  setLoggedIn(state: boolean) {
    this.loggedIn = state;
  }

  get isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
