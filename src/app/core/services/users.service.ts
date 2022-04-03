import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GetAllManagersGQL } from 'src/app/data/graphql/queries/get-all-managers.gql';
import { GetAllUsersGQL } from 'src/app/data/graphql/queries/get-all-users.gql';
import { GetUserGQL } from 'src/app/data/graphql/queries/get-user.gql';
import { ManagerModel } from 'src/app/data/models/manager.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private getUser: GetUserGQL,
    private getAllUsers: GetAllUsersGQL,
    private getAllAdmins: GetAllManagersGQL,
  ) { }

  getUserById(id: string) {
    return this.getUser.watch({
      id: id
    }).valueChanges.pipe(
      map(result => result.data.getUser)
    );
  }

  getUsers() {
    return this.getAllUsers.watch().valueChanges.pipe(
      map(result => result.data.getAllUsers)
    );
  }

  getAdmins() {
    return this.getAllAdmins.watch().valueChanges.pipe(
      map(result => result.data.getAllAdmins.map(x => new ManagerModel(x._id, x.firstName, x.lastName)))
    );
  }

}
