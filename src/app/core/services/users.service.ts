import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetAllManagersGQL } from 'src/app/data/graphql/queries/get-all-managers.gql';
import { GetAllUsersGQL } from 'src/app/data/graphql/queries/get-all-users.gql';
import { GetUserGQL } from 'src/app/data/graphql/queries/get-user.gql';
import { ManagerModel } from 'src/app/data/models/manager.model';
import { UserModel } from 'src/app/data/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private getUser: GetUserGQL,
    private getAllUsers: GetAllUsersGQL,
    private getAllManagers: GetAllManagersGQL,
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

  getManagers(): Observable<ManagerModel[]> {
    return this.getAllManagers.watch().valueChanges.pipe(
      map(result => result.data.getAllAdmins.map(x => new ManagerModel(x._id, x.firstName, x.lastName)))
    );
  }

}
