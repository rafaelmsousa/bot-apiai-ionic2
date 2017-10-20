import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class MinhaConta {
  itemSelecionado: any;
  itens: Array<{titulo: string, icone: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //Recebe o parametro de navegação do Submenu
    this.itemSelecionado = navParams.get('MinhaConta');

    this.itens = [];
    this.itens.push({
        titulo: "Saldo",
        icone: 'cash'
    });
    this.itens.push({
      titulo: "Extrato",
      icone: 'stats'
    });
    this.itens.push({
      titulo: "Lançamentos Futuros",
      icone: 'trending-down'
    });
    
  }

  itemTapped(event, item) {
    this.navCtrl.push(MinhaConta, {
      MinhaConta: item
    });
  }
}
