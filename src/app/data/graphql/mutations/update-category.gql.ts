import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class UpdateCategoryGQL extends Mutation<Response> {
  override document = gql`
        mutation UpdateCategory($nameToChange: String, $newParentCategoryId: String, $changedName: String) {
          updateCategory(nameToChange: $nameToChange, newParentCategoryId: $newParentCategoryId, changedName: $changedName)
        }
    `;
}

export interface Response {
  updateCategory: string;
}