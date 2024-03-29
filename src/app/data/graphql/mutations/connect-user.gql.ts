import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { JwtObjectGQL } from '../objects/jwt.object.gql';

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
  connectUser: JwtObjectGQL;
}