import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserGQL extends Mutation<Response> {
  override document = gql`
        mutation UpdateUser($_id: String, $email: String, $updatedUser: UserUpdateInput) {
          updateUser(_id: $_id, email: $email, updatedUser: $updatedUser) {
          }
        }
    `;
}

export interface Response {
  updateUser: string;
}