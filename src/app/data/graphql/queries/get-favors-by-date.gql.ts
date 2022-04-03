import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { FavorObjectGQL } from '../objects/favor.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetFavorsByDateGQL extends Query<Response> {
  override document = gql`
        query GetFavorsByDate($startingDate: DateTime, $limitDate: DateTime) {
          getFavorsByDate(startingDate: $startingDate, limitDate: $limitDate) {
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
  getFavorsByDate: Array<FavorObjectGQL>;
}