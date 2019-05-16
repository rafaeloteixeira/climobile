import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
/*
  Generated class for the GeocodingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocodingProvider {
  apiKey = 'AIzaSyDzl4h1C49yM0NT3o5aKFGv9aEprlt9_vA';

  
  constructor(public http: Http) {
    console.log('Hello GeocodingProvider Provider');
  }

  getLocal(lat, lng){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey).map(res=>res.json());
  }

}
