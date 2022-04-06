import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class UpdateFavorGQL extends Mutation<Response> {
  override document = gql`
        mutation UpdateFavor($favorId: String, $updatedFavor: UpdateFavorInput) {
          updateFavor(favorId: $favorId, updatedFavor: $updatedFavor)
        }
    `;
}

export interface Response {
  updateFavor: string;
}