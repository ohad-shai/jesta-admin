import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';
import { Jwt } from '../objects/jwt';

@Injectable({
  providedIn: 'root'
})
export class ConnectUserGQL extends Mutation<Response> {
  override document = gql`
        mutation ConnectUser($email: String!, $password: String!) {
          connectUser(email: $email, password: $password) {
            userId
            token
          }
        }
    `;
}

export interface Response {
  connectUser: Jwt;
}