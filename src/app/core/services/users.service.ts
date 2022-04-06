import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetAllUsersGQL } from 'src/app/data/graphql/queries/get-all-users.gql';
import { GetUserGQL } from 'src/app/data/graphql/queries/get-user.gql';
import { UserModel } from 'src/app/data/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private getUser: GetUserGQL,
    private getAllUsers: GetAllUsersGQL,
  ) { }

  getUserById(id: string): Observable<UserModel> {
    return this.getUser.watch({
      id: id
    }).valueChanges.pipe(
      map(result => new UserModel(
        result.data.getUser._id,
        result.data.getUser.firstName,
        result.data.getUser.lastName,
        result.data.getUser.email,
      ))
    );
  }

  getUsers(): Observable<UserModel[]> {
    return this.getAllUsers.watch().valueChanges.pipe(
      map(result => result.data.getAllUsers.map(x => new UserModel(x._id, x.firstName, x.lastName)))
    );
  }

}
