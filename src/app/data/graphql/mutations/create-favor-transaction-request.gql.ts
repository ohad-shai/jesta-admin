import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CreateFavorTransactionRequestGQL extends Mutation<Response> {
  override document = gql`
        mutation CreateFavorTransactionRequest($favorId: String!, $comment: String) {
          createFavorTransactionRequest(favorId: $favorId, comment: $comment) {
          }
        }
    `;
}

export interface Response {
  createFavorTransactionRequest: string;
}