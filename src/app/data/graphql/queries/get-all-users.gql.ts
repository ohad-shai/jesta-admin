import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { UserObjectGQL } from '../objects/user.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetAllUsersGQL extends Query<Response> {
  override document = gql`
        query GetAllUsers {
          getAllUsers {
            _id
            firstName
            lastName
            birthday
            email
            dateEmailVerified
            datePasswordModified
            phone
            address {
              fullAddress
              location {
                coordinates
              }
            }
            role
            imagePath
            created_date
          }
        }
    `;
}

export interface Response {
  getAllUsers: Array<UserObjectGQL>;
}