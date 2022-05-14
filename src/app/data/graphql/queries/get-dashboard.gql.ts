import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { FavorObjectGQL } from '../objects/favor.object.gql';
import { GraphDataObjectGQL } from '../objects/graph-data.object.gql';
import { UserObjectGQL } from '../objects/user.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetDashboardGQL extends Query<Response> {
  override document = gql`
        query GetDashboard {
          getNumOfUsers
          getNumberOfRequestedJesta
          getNumberOfOnProgressJesta
          getNumberOfExecutedJesta
          getUsersRegistrationLastMonth {
            labels
            dataSets
          }
          getJestaRegistrationLastMonth {
            labels
            dataSets
          }
          getAllUsers {
            _id
            firstName
            lastName
            email
          }
          getAllFavors {
            _id
            status
            ownerId
            categoryId
            numOfPeopleNeeded
            imagesPath
            paymentAmount
            paymentMethod
            dateToPublish
            dateToExecute
            dateToFinishExecute
            dateCreated
            dateLastModified
            sourceAddress {
              fullAddress
            }
          }
        }
    `;
}

export interface Response {
  getNumOfUsers: number;
  getNumberOfRequestedJesta: number;
  getNumberOfOnProgressJesta: number;
  getNumberOfExecutedJesta: number;
  getUsersRegistrationLastMonth: GraphDataObjectGQL;
  getJestaRegistrationLastMonth: GraphDataObjectGQL;
  getAllUsers: UserObjectGQL[];
  getAllFavors: FavorObjectGQL[];
}