import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { UserObjectGQL } from '../objects/user.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetAllManagersGQL extends Query<Response> {
  override document = gql`
        query GetAllAdmins {
          getAllAdmins {
            _id
            firstName
            lastName
          }
        }
    `;
}

export interface Response {
  getAllAdmins: Array<UserObjectGQL>;
}