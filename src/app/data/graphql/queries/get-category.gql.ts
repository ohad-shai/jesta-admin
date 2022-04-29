import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { CategoryObjectGQL } from '../objects/category.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetCategoryGQL extends Query<Response> {
  override document = gql`
        query GetCategory($name: String, $getCategoryId: String) {
          getCategory(name: $name, id: $getCategoryId) {
            _id
            parentCategory {
              _id
              name
              dateLastModified
            }
            name
            dateLastModified
          }
        }
    `;
}

export interface Response {
  getCategory: CategoryObjectGQL;
}