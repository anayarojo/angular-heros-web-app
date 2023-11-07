import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
    catchError,
    map,
    Observable,
    of,
    tap,
} from 'rxjs';

import { environment } from '@environments/environment';

import { User } from '../interfaces';
import { AuthService } from './auth.service.base';

@Injectable()
export class ServerAuthService extends AuthService {
  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {
    super();
  }

  get currentUser(): User | undefined {
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<boolean> {
    // Regular process
    // this.http.post('login', {email, password});
    return this.http.get<User[]>(`${this.baseUrl}/users`)
      .pipe(
        map(users => users.find(user => user.email == email)),
        map(user => {
          if (!user) {
            return false;
          }
          this.user = user;
          localStorage.setItem('token_id', user.id.toString());
          localStorage.setItem('token_user', user.email);
          return true;
        }),
        catchError(() => of(false))
      )
  }

  logout(): Observable<void> {
    this.user = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('token_id');
    localStorage.removeItem('token_user');

    return of();
  }

  checkAuthentication(): Observable<boolean> {
    const userId = localStorage.getItem('token_id');

    if (!userId) {
      return of(false);
    }

    return this.http.get<User>(`${this.baseUrl}/users/${userId}`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(() => of(false))
      );
  }
}
