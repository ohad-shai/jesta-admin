import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { FavorObjectGQL } from '../objects/favor.object.gql';

@Injectable({
  providedIn: 'root'
})
export class CreateFavorGQL extends Mutation<Response> {
  override document = gql`
        mutation CreateFavorGQL($favor: FavorInput) {
          createFavor(favor: $favor) {
            _id
            status
          }
        }
    `;
}

export interface Response {
  createFavor: FavorObjectGQL;
}