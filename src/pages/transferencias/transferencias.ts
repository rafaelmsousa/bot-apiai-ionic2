import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TransferenciasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-transferencias',
  templateUrl: 'transferencias.html',
})
export class Transferencias {

  itemSelecionado: any;
  itens: Array<{titulo: string, icone: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //Recebe o parametro de navegação do Submenu
    this.itemSelecionado = navParams.get('Transferencias');
    
    this.itens = [];
    this.itens.push({
        titulo: "TEV",
        icone: 'cash'
    });
    this.itens.push({
      titulo: "TED",
      icone: 'clock'
    });
    this.itens.push({
      titulo: "DOC",
      icone: 'calendar'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferenciasPage');
  }

  itemTapped(event, item) {
    this.navCtrl.push(Transferencias, {
      Transferencias: item
    });
  }

}
