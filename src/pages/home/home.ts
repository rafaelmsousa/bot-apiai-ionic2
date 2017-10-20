import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Http } from "@angular/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isLoading:boolean=true;
  saldo:any;

  constructor(public navCtrl: NavController, public events: Events, public modalCtrl : ModalController, private https: Http) {
    this.atualizaSaldo();
  }

  openVoiceModal() {
    var modalPage = this.modalCtrl.create('ModalPage'); modalPage.present(); 

    this.events.publish('openVoiceModal:buttonClicked', this.navCtrl.getActive);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.saldo="";
    this.atualizaSaldo();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  atualizaSaldo(){
    this.isLoading=true;

    let headers = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });

    //https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/componentSaldo/atualizaSaldo
    this.https.get('https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/componentSaldo/atualizaSaldo', {withCredentials: true}).subscribe(rsp => {
      console.log("----> HTTPS Get: 7 - Atualiza Saldo: status "+rsp.status);
      //console.log("----> HTTPS Get: 7 - Atualiza Saldo: data contem "+rsp.text("iso-8859").split(/\r\n|\r|\n/).length+" linhas");
      console.log("----> HTTPS Get: 7 - Atualiza Saldo: data "+rsp.text("iso-8859")); // data received by server
      //console.log("----> HTTPS Get: 7 - Atualiza Saldo: headers "+response.headers);

      let jsonSaldo:any = rsp.json();

      this.saldo = "R$ " + jsonSaldo.saldo;
      this.isLoading = false;

    },
    error => {
      console.log("----> ERRO HTTPS Get: 7 - Atualiza Saldo: status "+error.status);
      this.isLoading = false;
      alert("Erro ao obter saldo");

    });
  }

}
