import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserGQL extends Mutation<Response> {
  override document = gql`
        mutation DeleteUser($id: String, $email: String) {
          deleteUser(_id: $id, email: $email)
        }
    `;
}

export interface Response {
  deleteUser: string;
}