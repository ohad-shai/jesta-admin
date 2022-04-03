import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DeleteFavorGQL extends Mutation<Response> {
  override document = gql`
        mutation DeleteFavor($favorId: String) {
          deleteFavor(favorId: $favorId) {
          }
        }
    `;
}

export interface Response {
  deleteFavor: string;
}