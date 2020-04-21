import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginReq, LoginRes } from 'src/app/shared/models/login.model';
import { Observable } from 'rxjs';
import { RegisterReq, RegisterRes } from 'src/app/shared/models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private urlSuffix: string = '/auth';
  private authTokenStorageKey: string = 'webExaminerAuthTokenStorageKey';
  private emailStorageKey: string = 'webExaminerEmailStorageKey';
  public adminAuthTokeStorageKey = 'adminAuthToken';
  private loggedIn: boolean = false;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.loggedIn = !!localStorage.getItem(this.authTokenStorageKey);
  }

  tokenIsValid$() {
    return this.httpClient.get(this.urlSuffix + '/valid');
  }

  login$(loginBody: LoginReq): Observable<LoginRes> {
    return this.httpClient.post<LoginRes>(this.urlSuffix + '/login', loginBody);
  }

  register$(registerBody: RegisterReq): Observable<RegisterRes> {
    return this.httpClient.post<RegisterRes>(this.urlSuffix + '/register', registerBody);
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem(this.authTokenStorageKey);
    localStorage.removeItem(this.emailStorageKey);
  }



  // Functions to access private properties
  get token(): string {
    return localStorage.getItem(this.authTokenStorageKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.authTokenStorageKey, token);
  }

  get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(state: boolean): void {
    this.loggedIn = state;
  }

  get email(): string {
    return localStorage.getItem(this.emailStorageKey);
  }

  setEmail(email: string) {
    localStorage.setItem(this.emailStorageKey, email);
  }
}
