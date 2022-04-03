import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class UpdatePerformGQL extends Mutation<Response> {
  override document = gql`
        mutation UpdatePerform($performId: String, $updatedPerform: UpdatePerformInput) {
          updatePerform(performId: $performId, updatedPerform: $updatedPerform) {
          }
        }
    `;
}

export interface Response {
  updatePerform: string;
}