import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { CategoryObjectGQL } from '../objects/category.object.gql';

@Injectable({
  providedIn: 'root'
})
export class CreateCategoryGQL extends Mutation<Response> {
  override document = gql`
        mutation CreateCategory($name: String) {
          createCategory(name: $name) {
            _id
            name
          }
        }
    `;
}

export interface Response {
  createCategory: CategoryObjectGQL;
}