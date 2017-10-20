import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PagamentosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pagamentos',
  templateUrl: 'pagamentos.html',
})
export class Pagamentos {

  itemSelecionado: any;
  itens: Array<{titulo: string, icone: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //Recebe o parametro de navegação do Submenu
    this.itemSelecionado = navParams.get('Pagamentos');
    
    this.itens = [];
    this.itens.push({
        titulo: "Fatura do Cartão",
        icone: 'card'
    });
    this.itens.push({
      titulo: "Boletos e Títulos",
      icone: 'barcode'
    });
    this.itens.push({
      titulo: "Convenios",
      icone: 'barcode'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagamentosPage');
  }

  itemTapped(event, item) {
    this.navCtrl.push(Pagamentos, {
      Pagamentos: item
    });
  }

}
