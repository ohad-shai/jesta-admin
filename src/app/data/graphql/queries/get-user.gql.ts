import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { UserGQLObject } from '../objects/user.gql-obj';

@Injectable({
  providedIn: 'root'
})
export class GetUserGQL extends Query<Response> {
  override document = gql`
        query GetUser($id: String) {
          getUser(_id: $id) {
            _id
            firstName
            lastName
            email
          }
        }
    `;
}

export interface Response {
  getUser: UserGQLObject;
}