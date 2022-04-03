import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { FavorObjectGQL } from '../objects/favor.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetFavorsInRadiosGQL extends Query<Response> {
  override document = gql`
        query GetFavorsInRadios($center: [Float], $radius: Float) {
          getFavorsInRadios(center: $center, radius: $radius) {
            _id
            ownerId
            categoryId
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
  getFavorsInRadios: Array<FavorObjectGQL>;
}