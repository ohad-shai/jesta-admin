import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DeletePerformGQL extends Mutation<Response> {
  override document = gql`
        mutation DeletePerform($performId: String) {
          deletePerform(performId: $performId) {
          }
        }
    `;
}

export interface Response {
  deletePerform: string;
}