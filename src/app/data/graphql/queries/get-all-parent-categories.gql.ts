import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { CategoryObjectGQL } from '../objects/category.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetAllParentCategoriesGQL extends Query<Response> {
  override document = gql`
      query GetAllParentCategories {
        getAllParentCategories {
          _id
          name
          dateLastModified
        }
      }
    `;
}

export interface Response {
  getAllParentCategories: CategoryObjectGQL[];
}