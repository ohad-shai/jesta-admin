import { Injectable } from '@angular/core';
import { ConnectUserGQL } from 'src/app/data/graphql/mutations/connect-user.gql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private connectUser: ConnectUserGQL
  ) { }

  login(email: string, password: string, remember: boolean) {
    let query = this.connectUser.mutate({
      email: email,
      password: password
    });
    query.subscribe(
      result => {
        // TODO:
        console.log(result.data?.connectUser.token);
        console.log(result.data?.connectUser.userId);
      },
      error => { }
    );
    return query;
  }

  isAuthenticated() {
    return false;
  }

  getCurrentUser() {
    return null;
  }

}
