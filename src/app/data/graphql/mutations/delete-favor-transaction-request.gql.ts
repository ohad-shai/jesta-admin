import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DeleteFavorTransactionRequestGQL extends Mutation<Response> {
  override document = gql`
        mutation DeleteFavorTransactionRequest($favorTransactionId: String!) {
          deleteFavorTransactionRequest(favorTransactionId: $favorTransactionId) {
          }
        }
    `;
}

export interface Response {
  deleteFavorTransactionRequest: string;
}