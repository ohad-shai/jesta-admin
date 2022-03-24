import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GetUserGQL } from 'src/app/data/graphql/queries/get-user.gql';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private getUser: GetUserGQL,
  ) { }

  getUserById(id: string) {
    return this.getUser.watch({
      id: id
    }).valueChanges.pipe(
      map(result => result.data.getUser)
    );
  }

}
