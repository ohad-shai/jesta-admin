import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserCreateInputGQL } from 'src/app/data/graphql/inputs/user-create.input.gql';
import { UserSecureUpdateInputGQL } from 'src/app/data/graphql/inputs/user-secure-update.input.gql';
import { UserUpdateInputGQL } from 'src/app/data/graphql/inputs/user-update.input.gql';
import { DeleteUserGQL } from 'src/app/data/graphql/mutations/delete-user.gql';
import { SecureEmailPasswordAccountUpdateGQL } from 'src/app/data/graphql/mutations/secure-email-password-account-update.gql';
import { SignUpUserGQL } from 'src/app/data/graphql/mutations/sign-up-user.gql';
import { UpdateUserGQL } from 'src/app/data/graphql/mutations/update-user.gql';
import { GetAllClientsGQL } from 'src/app/data/graphql/queries/get-all-clients.gql';
import { GetUserGQL } from 'src/app/data/graphql/queries/get-user.gql';
import { UserModel } from 'src/app/data/models/user.model';
import { AuthData } from '../objects/auth-data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private getUserGQL: GetUserGQL,
    private getAllClientsGQL: GetAllClientsGQL,
    private signUpUserGQL: SignUpUserGQL,
    private updateUserGQL: UpdateUserGQL,
    private deleteUserGQL: DeleteUserGQL,
    private secureEmailPasswordAccountUpdateGQL: SecureEmailPasswordAccountUpdateGQL,
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

  getAllClients(): Observable<UserModel[]> {
    return this.getAllClientsGQL.watch().valueChanges.pipe(
      map(result => result.data.getAllClients.map(x => new UserModel(x._id, x.firstName, x.lastName)))
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
        userId: result.data?.signUpUser.userId,
        token: result.data?.signUpUser.token,
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
    return this.secureEmailPasswordAccountUpdateGQL.mutate({
      id: id,
      email: currentEmail,
      password: password,
      updateParams: <UserSecureUpdateInputGQL>{
        email: newEmail,
      },
    }).pipe(
      map(result => result.data?.secureEmailPasswordAccountUpdate)
    );
  }

  updateUserPasswordSecure(id: string, password: string, newPassword: string) {
    return this.secureEmailPasswordAccountUpdateGQL.mutate({
      id: id,
      password: password,
      updateParams: <UserSecureUpdateInputGQL>{
        password: newPassword
      },
    }).pipe(
      map(result => result.data?.secureEmailPasswordAccountUpdate)
    );
  }

  deleteUserAccountSecure(id: string, password: string) {
    return this.secureEmailPasswordAccountUpdateGQL.mutate({
      id: id,
      password: password,
      updateParams: <UserSecureUpdateInputGQL>{
        accountDelete: true
      },
    }).pipe(
      map(result => result.data?.secureEmailPasswordAccountUpdate)
    );
  }

}
