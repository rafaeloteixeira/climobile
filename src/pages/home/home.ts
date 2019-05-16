import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClimaProvider } from '../../providers/clima/clima';
import { Storage } from '@ionic/storage';
import { AppPreferences } from '@ionic-native/app-preferences';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  clima:any;
  idLocal:any;

  constructor(public navCtrl: NavController, private climaProvider:ClimaProvider, private storage:Storage, private appPreferences: AppPreferences) {

  }

  ionViewWillEnter(){

    this.storage.get('idLocal').then((val) =>{
      if(val != null){
        this.idLocal = val;
      }
      else{
        this.appPreferences.fetch('id').then((res) => { 
          if(res != null) 
            this.idLocal = res;
            else
            this.idLocal = 3477;
        });
      }

      this.climaProvider.getClima(this.idLocal).subscribe(clima => {
        this.clima = clima;
      });

    });


  }
}
