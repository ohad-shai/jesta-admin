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
            status
            ownerId {
              _id
              firstName
              lastName
              email
              phone
              role
              imagePath
              rating
              numberOfExecutedJesta
              mostVolunteered
            }
            categoryId {
              _id
              dateLastModified
              name
              parentCategory {
                _id
                name
                dateLastModified
              }
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
              location {
                coordinates
              }
            }
            description
            imagesPath
            paymentAmount
            paymentMethod
            dateToPublish
            dateToExecute
            dateToFinishExecute
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