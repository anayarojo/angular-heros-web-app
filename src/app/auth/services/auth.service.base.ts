import { Observable } from 'rxjs';

import { User } from '../interfaces';

export abstract class AuthService {
  abstract readonly currentUser: User | undefined;
  abstract login(email: string, password: string): Observable<User>;
  abstract logout(): Observable<void>;
  abstract checkAuthentication(): Observable<boolean>;
}
