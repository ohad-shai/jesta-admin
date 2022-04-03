import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { PerformObjectGQL } from '../objects/perform.object.gql';

@Injectable({
  providedIn: 'root'
})
export class CreatePerformGQL extends Mutation<Response> {
  override document = gql`
        mutation CreatePerform($perform: PerformInput) {
          createPerform(perform: $perform) {
          }
        }
    `;
}

export interface Response {
  createPerform: PerformObjectGQL;
}