import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { PerformObjectGQL } from '../objects/perform.object.gql';

@Injectable({
  providedIn: 'root'
})
export class GetPerformsInRadiosGQL extends Query<Response> {
  override document = gql`
        query GetPerformsInRadios($center: [Float], $radius: Float) {
          getPerformsInRadios(center: $center, radius: $radius) {
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
  getPerformsInRadios: Array<PerformObjectGQL>;
}