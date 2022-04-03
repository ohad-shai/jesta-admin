import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { CategoryObjectGQL } from '../objects/category.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetAllCategoriesGQL extends Query<Response> {
  override document = gql`
        query GetAllCategories {
          getAllCategories {
            _id
            name
            dateLastModified
          }
        }
    `;
}

export interface Response {
  getAllCategories: Array<CategoryObjectGQL>;
}