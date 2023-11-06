import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
    catchError,
    map,
    Observable,
    of,
    tap,
} from 'rxjs';

import { environment } from '../../../environments/environment';
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

  login(email: string, password: string): Observable<User> {
    // Regular process
    // this.http.post('login', {email, password});
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', this.generateToken())),
        tap(user => localStorage.setItem('token_id', user.id.toString())),
        tap(user => localStorage.setItem('token_user', user.email))
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
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => this.user = user),
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  private generateToken(): string {
    return this.generateUuid();
  }

  private generateUuid(): string {
    const timestamp = this.getHex(Date.now() / 1000);
    const random = ' '.repeat(16).replace(/./g, () => this.getHex(Math.random() * 16));
    return `${timestamp}${random}`;
  }

  private getHex = (value: number) => Math.floor(value).toString(16);
}
