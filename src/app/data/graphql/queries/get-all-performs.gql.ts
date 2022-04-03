import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { PerformObjectGQL } from '../objects/perform.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetAllPerformsGQL extends Query<Response> {
  override document = gql`
        query GetAllPerforms {
          getAllPerforms {
            _id
            performerId
            categoryId
            addressPreference {
              fullAddress
              location {
                coordinates
              }
            }
            minimumPaymentAmount
            activityDays {
              sunday
              monday
              tuesday
              wednesday
              thursday
              friday
              saturday
            }
            activityHoursStart
            address {
              fullAddress
            }
            dateCreated
            dateLastModified
            preferredPaymentMethod
          }
        }
    `;
}

export interface Response {
  getAllPerforms: Array<PerformObjectGQL>;
}