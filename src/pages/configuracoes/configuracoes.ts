import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClimaProvider } from '../../providers/clima/clima';
import { GeocodingProvider } from '../../providers/geocoding/geocoding';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AppPreferences } from '@ionic-native/app-preferences';

/**
 * Generated class for the ConfiguracoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  cidade:string;
  estado:string;
  local:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private climaProvider:ClimaProvider,
    private geocodingProvider:GeocodingProvider,
    private storage:Storage,
    public toastCtrl: ToastController,
    public geolocation: Geolocation,
    private appPreferences: AppPreferences) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  salvar(){

    this.climaProvider.getIdLocal(this.cidade, this.estado).subscribe( local => {

        this.local = local;

        if(this.local != null && this.local.length > 0){
          this.storage.set('idLocal', this.local[0].id);
          this.appPreferences.store('id',this.local[0].id);
          
          this.navCtrl.push(HomePage);
        }
        else{
          this.erroToast("Não foi possível localizar");
        }

    });

  }
  getLocationGps(){

    this.geolocation.getCurrentPosition().then((resp) => {
      if(resp.coords != null){
        this.geocodingProvider.getLocal(resp.coords.latitude, resp.coords.longitude).subscribe( local => {
          this.cidade = local.results[0].address_components[3].long_name;
          this.estado = local.results[0].address_components[5].short_name;
      });
      }
     }).catch((error) => {
      this.erroToast('Error getting location');
     });


  }

  erroToast(erro) {
    const toast = this.toastCtrl.create({
      message: erro,
      duration: 3000
    });
    toast.present();
  }

}