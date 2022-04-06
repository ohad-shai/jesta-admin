import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { JwtObjectGQL } from '../objects/jwt.object.gql';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserEmailSecureGQL extends Mutation<Response> {
  override document = gql`
        mutation UpdateUserEmailSecure($id: String, $currentEmail: String!, $password: String!, $toUpdate: UserUpdateInput) {
          connectUser(email: $currentEmail, password: $password) {
            token
            userId
          }
          updateUser(_id: $id, updatedUser: $toUpdate)
        }
    `;
}

export interface Response {
  connectUser: JwtObjectGQL;
}