import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { FavorTransactionObjectGQL } from '../objects/favor-transaction.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetAllFavorTransactionGQL extends Query<Response> {
  override document = gql`
        query GetAllFavorTransaction {
          getAllFavorTransaction {
            _id
            favorId
            favorOwnerId
            handledByUserId
            ownerComment
            handlerComment
            dateAccepted
            dateCompleted
            dateCreated
            dateLastModified
          }
        }
    `;
}

export interface Response {
  getAllFavorTransaction: Array<FavorTransactionObjectGQL>;
}