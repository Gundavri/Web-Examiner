import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGetRes, UserDeleteRes } from 'src/app/shared/models/user';

@Injectable()
export class UserService {

  private urlSuffix = '/user';

  constructor(
    private httpClient: HttpClient
  ) { }

  usersGet$(): Observable<UserGetRes[]> {
    return this.httpClient.get<UserGetRes[]>(this.urlSuffix);
  }

  userDelete$(userId: string): Observable<UserDeleteRes> {
    return this.httpClient.delete<UserDeleteRes>(this.urlSuffix + '/' + userId);
  }
}
