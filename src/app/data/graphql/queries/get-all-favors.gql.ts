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
            status
            ownerId
            categoryId
            numOfPeopleNeeded
            imagesPath
            paymentAmount
            paymentMethod
            dateToPublish
            dateToExecute
            dateToFinishExecute
            dateCreated
            dateLastModified
            sourceAddress {
              fullAddress
            }
          }
        }
    `;
}

export interface Response {
  getAllFavors: FavorObjectGQL[];
}