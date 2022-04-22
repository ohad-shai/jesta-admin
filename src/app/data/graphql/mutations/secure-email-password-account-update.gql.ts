import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class SecureEmailPasswordAccountUpdateGQL extends Mutation<Response> {
  override document = gql`
        mutation SecureEmailPasswordAccountUpdate($id: String, $email: String, $password: String, $updateParams: UserSecureUpdate) {
          secureEmailPasswordAccountUpdate(_id: $id, email: $email, password: $password, updateParams: $updateParams)
        }
    `;
}

export interface Response {
  secureEmailPasswordAccountUpdate: string;
}