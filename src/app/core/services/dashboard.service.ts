import { Injectable } from '@angular/core';
import { GetDashboardGQL } from 'src/app/data/graphql/queries/get-dashboard.gql';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private getDashboardGQL: GetDashboardGQL,
  ) { }

  getDashboard() {
    return this.getDashboardGQL.watch().valueChanges;
  }

}
