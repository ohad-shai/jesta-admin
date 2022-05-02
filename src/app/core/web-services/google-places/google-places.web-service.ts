import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutocompleteResult } from './objects/autocomplete-result';
import { DetailsResult } from './objects/details-result';

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesWebService {

  private BASE_URL = "https://maps.googleapis.com/maps/api/place/";
  private API_KEY = "AIzaSyAVG_ab0EVydUEJryTuMORnKhSlbphuQns";

  constructor(
    private http: HttpClient,
  ) { }

  autocomplete(query: string) {
    return this.http.get<AutocompleteResult>(this.BASE_URL + 'autocomplete/json?key=' + this.API_KEY + '&language=iw&region=il&input=' + query);
  }

  getCoordinatesByPlaceId(placeId: string) {
    return this.http.get<DetailsResult>(this.BASE_URL + 'details/json?key=' + this.API_KEY + '&language=iw&region=il&fields=geometry&place_id=' + placeId);
  }

}
