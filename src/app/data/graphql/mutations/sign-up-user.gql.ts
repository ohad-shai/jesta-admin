import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { JwtObjectGQL } from '../objects/jwt.object.gql';

@Injectable({
  providedIn: 'root'
})
export class SignUpUserGQL extends Mutation<Response> {
  override document = gql`
        mutation SignUpUser($userParams: UserCreateInput, $file: Upload) {
          signUpUser(userParams: $userParams, file: $file) {
            userId
            token
          }
        }
    `;
}

export interface Response {
  signUpUser: JwtObjectGQL;
}