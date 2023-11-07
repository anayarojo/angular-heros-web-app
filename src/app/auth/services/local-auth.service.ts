import { Injectable } from '@angular/core';

import {
    catchError,
    map,
    Observable,
    of,
    tap,
} from 'rxjs';

import * as data from '@assets/data/db.json';

import { User } from '../interfaces';

@Injectable({providedIn: 'root'})
export class LocalAuthService {
  private readonly DATA = data;

  private initialized = false;
  private users: User[] = [];
  private user?: User;

  get currentUser(): User | undefined {
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.listUsers()
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
      );
  }

  logout(): Observable<void> {
    this.user = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('token_id');
    localStorage.removeItem('token_user');

    return of(void 0);
  }

  checkAuthentication(): Observable<boolean> {
    const userId = localStorage.getItem('token_id');

    if (!userId) {
      return of(false);
    }

    return this.getUser(userId)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(() => of(false))
      );
  }

  private getUser(id: string): Observable<User> {
    return new Observable<User>(observer => {
      this.initialize().then(() => {
        const user = this.users.find(user => user.id === id);
        observer.next(user);
        observer.complete();
      });
    });
  }

  private listUsers(): Observable<User[]> {
    return new Observable<User[]>(observer => {
      this.initialize().then(() => {
        observer.next(this.users);
        observer.complete();
      });
    });
  }

  private async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (!localStorage.getItem('data_users')) {
      const users = this.DATA.users.map(user => structuredClone(user));
      localStorage.setItem('data_users', JSON.stringify(users));
    }

    this.users = JSON.parse(localStorage.getItem('data_users') ?? '[]');
    this.initialized = true;
  }
}
