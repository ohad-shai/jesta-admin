import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserCreateInputGQL } from 'src/app/data/graphql/inputs/user-create.input.gql';
import { UserUpdateInputGQL } from 'src/app/data/graphql/inputs/user-update.input.gql copy';
import { DeleteUserGQL } from 'src/app/data/graphql/mutations/delete-user.gql';
import { SignUpAdminGQL } from 'src/app/data/graphql/mutations/sign-up-admin.gql';
import { UpdateUserEmailSecureGQL } from 'src/app/data/graphql/mutations/update-user-email-secure.gql';
import { UpdateUserGQL } from 'src/app/data/graphql/mutations/update-user.gql';
import { GetAllUsersGQL } from 'src/app/data/graphql/queries/get-all-users.gql';
import { GetUserGQL } from 'src/app/data/graphql/queries/get-user.gql';
import { UserModel } from 'src/app/data/models/user.model';
import { AuthData } from '../objects/auth-data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private getUserGQL: GetUserGQL,
    private getAllUsersGQL: GetAllUsersGQL,
    private signUpUserGQL: SignUpAdminGQL,
    private updateUserGQL: UpdateUserGQL,
    private deleteUserGQL: DeleteUserGQL,
    private updateUserEmailSecureGQL: UpdateUserEmailSecureGQL,
  ) { }

  getUserById(id: string): Observable<UserModel> {
    return this.getUserGQL.watch({
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

  getAllUsers(): Observable<UserModel[]> {
    return this.getAllUsersGQL.watch().valueChanges.pipe(
      map(result => result.data.getAllUsers.map(x => new UserModel(x._id, x.firstName, x.lastName)))
    );
  }

  createUser(user: UserModel) {
    return this.signUpUserGQL.mutate({
      userParams: <UserCreateInputGQL>{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        hashedPassword: user.password,
      }
    }).pipe(
      map(result => <AuthData>{
        userId: result.data?.signUpAdmin.userId,
        token: result.data?.signUpAdmin.token,
      })
    );
  }

  updateUser(user: UserModel) {
    return this.updateUserGQL.mutate({
      id: user.id,
      updatedUser: <UserUpdateInputGQL>{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        hashedPassword: user.password,
      },
    }).pipe(
      map(result => result.data?.updateUser)
    );
  }

  deleteUser(id: string) {
    return this.deleteUserGQL.mutate({
      id: id
    }).pipe(
      map(result => result.data?.deleteUser)
    );
  }

  updateUserEmailSecure(id: string, currentEmail: string, password: string, newEmail: string) {
    return this.updateUserEmailSecureGQL.mutate({
      id: id,
      currentEmail: currentEmail,
      password: password,
      toUpdate: <UserUpdateInputGQL>{
        email: newEmail,
      },
    }).pipe(
      map(result => result.data?.connectUser)
    );
  }

}
