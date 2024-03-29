import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { JwtObjectGQL } from '../objects/jwt.object.gql';

@Injectable({
  providedIn: 'root'
})
export class SignUpAdminGQL extends Mutation<Response> {
  override document = gql`
        mutation SignUpAdmin($userParams: UserCreateInput, $file: Upload) {
          signUpAdmin(userParams: $userParams, file: $file) {
            userId
            token
          }
        }
    `;
}

export interface Response {
  signUpAdmin: JwtObjectGQL;
}