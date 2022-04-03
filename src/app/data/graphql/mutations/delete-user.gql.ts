import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserGQL extends Mutation<Response> {
  override document = gql`
        mutation DeleteUser($_id: String, $email: String) {
          deleteUser(_id: $_id, email: $email) {
          }
        }
    `;
}

export interface Response {
  deleteUser: string;
}