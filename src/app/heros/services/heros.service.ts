import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
    catchError,
    Observable,
    of,
} from 'rxjs';
import { environment } from 'src/environments/environment';

import { Hero } from '../interfaces';

@Injectable({providedIn: 'root'})
export class HerosService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getHeros(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero|undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }
}
