import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class HandleFavorTransactionRequestGQL extends Mutation<Response> {
  override document = gql`
        mutation HandleFavorTransactionRequest($favorTransactionId: String!, $status: FavorTransactionStatus, $comment: String) {
          handleFavorTransactionRequest(favorTransactionId: $favorTransactionId, status: $status, comment: $comment) {
          }
        }
    `;
}

export interface Response {
  handleFavorTransactionRequest: string;
}