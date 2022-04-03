import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { PopulatedFavorObjectGQL } from '../objects/populated-favor.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetFavorGQL extends Query<Response> {
  override document = gql`
        query GetFavor($favorId: String) {
          getFavor(favorId: $favorId) {
            _id
            ownerId {
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
              }
              role
              imagePath
              created_date
            }
            categoryId {
              _id
              name
              dateLastModified
            }
            numOfPeopleNeeded
            sourceAddress {
              fullAddress
              location {
                coordinates
              }
            }
            destinationAddress {
              fullAddress
            }
            description
            imagesPath
            paymentAmount
            paymentMethod
            dateToPublish
            dateToUnpublished
            dateLockedOut
            dateCreated
            dateLastModified
          }
        }
    `;
}

export interface Response {
  getFavor: PopulatedFavorObjectGQL;
}