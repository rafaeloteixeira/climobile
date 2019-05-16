import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'

@Injectable()
export class ClimaProvider {
  apiKey = '2ec5a32e32a38d87ce8ff80939f5409d';

  constructor(public http: Http) {
    console.log('Hello ClimaProvider Provider');
  }

  getClima(idLocal){
    return this.http.get('http://apiadvisor.climatempo.com.br/api/v1/weather/locale/'+idLocal+'/current?token='+this.apiKey)
      .map(res=>res.json());
  }

  getIdLocal(cidade, estado){
    return this.http.get('http://apiadvisor.climatempo.com.br/api/v1/locale/city?name='+cidade+'&state='+estado+'&token='+this.apiKey)
      .map(res=>res.json());
  }
}
