import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { UserObjectGQL } from '../objects/user.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetAllClientsGQL extends Query<Response> {
  override document = gql`
        query GetAllClients {
          getAllClients {
            _id
            firstName
            lastName
            email
          }
        }
    `;
}

export interface Response {
  getAllClients: Array<UserObjectGQL>;
}