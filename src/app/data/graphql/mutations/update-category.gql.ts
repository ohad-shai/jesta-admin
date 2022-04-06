import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class UpdateCategoryGQL extends Mutation<Response> {
  override document = gql`
        mutation UpdateCategory($nameToChange: String, $changedName: string) {
          updateCategory(nameToChange: $nameToChange, changedName: $changedName)
        }
    `;
}

export interface Response {
  updateCategory: string;
}