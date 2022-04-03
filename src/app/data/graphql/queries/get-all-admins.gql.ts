import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { UserObjectGQL } from '../objects/user.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetAllAdminsGQL extends Query<Response> {
  override document = gql`
        query GetAllAdmins() {
          getAllAdmins() {
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
  getAllAdmins: Array<UserObjectGQL>;
}