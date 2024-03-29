import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { CategoryObjectGQL } from '../objects/category.object.gql';

@Injectable({
  providedIn: 'root'
})
export class CreateCategoryGQL extends Mutation<Response> {
  override document = gql`
        mutation CreateCategory($name: String, $parentCategory: String) {
          createCategory(name: $name, parentCategory: $parentCategory) {
            _id
            name
            dateLastModified
            parentCategory {
              _id
              name
              dateLastModified
            }
          }
        }
    `;
}

export interface Response {
  createCategory: CategoryObjectGQL;
}