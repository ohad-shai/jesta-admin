import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserCreateInputGQL } from 'src/app/data/graphql/inputs/user-create.input.gql';
import { UserUpdateInputGQL } from 'src/app/data/graphql/inputs/user-update.input.gql';
import { DeleteUserGQL } from 'src/app/data/graphql/mutations/delete-user.gql';
import { SignUpAdminGQL } from 'src/app/data/graphql/mutations/sign-up-admin.gql';
import { UpdateUserGQL } from 'src/app/data/graphql/mutations/update-user.gql';
import { GetAllManagersGQL } from 'src/app/data/graphql/queries/get-all-managers.gql';
import { GetUserGQL } from 'src/app/data/graphql/queries/get-user.gql';
import { ManagerModel } from 'src/app/data/models/manager.model';
import { AuthData } from '../objects/auth-data';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  constructor(
    private getUserGQL: GetUserGQL,
    private getAllManagersGQL: GetAllManagersGQL,
    private signUpAdminGQL: SignUpAdminGQL,
    private updateUserGQL: UpdateUserGQL,
    private deleteUserGQL: DeleteUserGQL,
  ) { }

  getManagerById(id: string) {
    return this.getUserGQL.watch({
      id: id
    }).valueChanges.pipe(
      map(result => new ManagerModel(
        result.data.getUser._id,
        result.data.getUser.firstName,
        result.data.getUser.lastName,
        result.data.getUser.email,
      ))
    );
  }

  getAllManagers() {
    return this.getAllManagersGQL.watch().valueChanges.pipe(
      map(result => result.data.getAllAdmins.map(x => new ManagerModel(x._id, x.firstName, x.lastName)))
    );
  }

  createManager(manager: ManagerModel) {
    return this.signUpAdminGQL.mutate({
      userParams: <UserCreateInputGQL>{
        firstName: manager.firstName,
        lastName: manager.lastName,
        email: manager.email,
        hashedPassword: manager.password,
      }
    }).pipe(
      map(result => <AuthData>{
        userId: result.data?.signUpAdmin.userId,
        token: result.data?.signUpAdmin.token,
      })
    );
  }

  updateManager(manager: ManagerModel) {
    return this.updateUserGQL.mutate({
      id: manager.id,
      updatedUser: <UserUpdateInputGQL>{
        firstName: manager.firstName,
        lastName: manager.lastName,
        email: manager.email,
        hashedPassword: manager.password,
      },
    }).pipe(
      map(result => result.data?.updateUser)
    );
  }

  deleteManager(id: string) {
    return this.deleteUserGQL.mutate({
      id: id
    }).pipe(
      map(result => result.data?.deleteUser)
    );
  }

}
