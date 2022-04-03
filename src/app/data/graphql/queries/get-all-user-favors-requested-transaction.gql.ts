import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { FavorTransactionObjectGQL } from '../objects/favor-transaction.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetAllUserFavorsRequestedTransactionGQL extends Query<Response> {
  override document = gql`
        query GetAllUserFavorsRequestedTransaction {
          getAllUserFavorsRequestedTransaction {
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
  getAllUserFavorsRequestedTransaction: Array<FavorTransactionObjectGQL>;
}