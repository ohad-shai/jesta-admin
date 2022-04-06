import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserIdentity } from 'src/app/core/objects/user-identity';
import { ConnectUserGQL } from 'src/app/data/graphql/mutations/connect-user.gql';
import { UsersService } from './users.service';
import { AuthData } from '../objects/auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly AUTH_STORAGE_KEY: string = "auth";

  private currentUserSubject = new BehaviorSubject<UserIdentity | null>(null);

  constructor(
    private connectUser: ConnectUserGQL,
    private usersService: UsersService,
  ) { }

  /* #region  Public API */

  login(email: string, password: string, remember: boolean): Observable<AuthData> {
    let observable = this.connectUser.mutate({
      email: email,
      password: password
    }).pipe(
      map(result => <AuthData>{
        userId: result.data?.connectUser.userId,
        token: result.data?.connectUser.token,
      })
    );
    observable.subscribe({
      next: (result) => {
        this.setCurrentUserAuthToStorage(result, remember);
        this.initializeCurrentUser();
      },
      error: () => { }
    });
    return observable;
  }

  logout() {
    this.currentUserSubject.next(null);
    this.removeCurrentUserAuthFromStorage();
  }

  getCurrentUserValidJwtToken(): string | null {
    let authData = this.getCurrentUserAuthFromStorage();
    if (authData != null && this.isJwtTokenValid(authData.token)) {
      return authData.token;
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    if (this.currentUserSubject.value != null) {
      return true;
    } else {
      return (this.getCurrentUserValidJwtToken() != null);
    }
  }

  getCurrentUser(): UserIdentity | null {
    return this.currentUserSubject.value;
  }

  observeCurrentUser(): Observable<UserIdentity | null> {
    return this.currentUserSubject.asObservable();
  }

  initializeCurrentUser(): void {
    let authData = this.getCurrentUserAuthFromStorage();
    if (authData != null) {
      this.usersService.getUserById(authData.userId).pipe(
        map(result => <UserIdentity>{
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
        })
      ).subscribe(userIdentity => {
        this.currentUserSubject.next(userIdentity);
      });
    }
  }

  updateCurrentUser(toUpdate: UserIdentity) {
    this.currentUserSubject.next(toUpdate);
  }

  /* #endregion */

  /* #region  Private Methods */

  private isJwtTokenValid(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) < expiry;
  }

  private setCurrentUserAuthToStorage(authData: AuthData, persist: boolean): void {
    if (persist) {
      localStorage.setItem(AuthService.AUTH_STORAGE_KEY, JSON.stringify({
        token: authData.token,
        uid: authData.userId,
      }));
    } else {
      sessionStorage.setItem(AuthService.AUTH_STORAGE_KEY, JSON.stringify({
        token: authData.token,
        uid: authData.userId,
      }));
    }
  }

  private getCurrentUserAuthFromStorage(): AuthData | null {
    let authData = localStorage.getItem(AuthService.AUTH_STORAGE_KEY);
    if (authData != null) {
      let obj = JSON.parse(authData);
      return <AuthData>{ token: obj.token, userId: obj.uid };
    }
    authData = sessionStorage.getItem(AuthService.AUTH_STORAGE_KEY);
    if (authData != null) {
      let obj = JSON.parse(authData);
      return <AuthData>{ token: obj.token, userId: obj.uid };
    }
    return null;
  }

  private removeCurrentUserAuthFromStorage(): void {
    localStorage.removeItem(AuthService.AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AuthService.AUTH_STORAGE_KEY);
  }

  /* #endregion */

}
