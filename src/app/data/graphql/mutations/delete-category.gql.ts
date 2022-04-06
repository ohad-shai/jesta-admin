import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DeleteCategoryGQL extends Mutation<Response> {
  override document = gql`
        mutation DeleteCategory($name: String) {
          deleteCategory(name: $name)
        }
    `;
}

export interface Response {
  deleteCategory: string;
}