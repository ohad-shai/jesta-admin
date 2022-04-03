import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { FavorObjectGQL } from '../objects/favor.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetAllFavorsGQL extends Query<Response> {
  override document = gql`
        query GetAllFavors {
          getAllFavors {
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
  getAllFavors: Array<FavorObjectGQL>;
}