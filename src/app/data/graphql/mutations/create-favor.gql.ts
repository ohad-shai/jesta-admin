import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { FavorObjectGQL } from '../objects/favor.object.gql';

@Injectable({
  providedIn: 'root'
})
export class CreateFavorGQL extends Mutation<Response> {
  override document = gql`
        mutation CreateFavor($favor: FavorInput) {
          createFavor(favor: $favor) {
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
  createFavor: FavorObjectGQL;
}